import { Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';
import { PhotosService } from 'src/services/photos.service';
import {MatDialog} from '@angular/material/dialog';
import { ImageViewComponent } from './page/imageView/imageView.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(
    private photosService: PhotosService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  cards : string [] = [];
  haveCards: boolean = false
  
	public ngOnInit() {
    console.log('llego')
    this.getTokenAndPhoto(null, null);
    // this.photosService.getPhotos().subscribe((res) => {
    //   console.log(res)
    // });
    // TODO GET PHOTOSERVICES
  }

  //gets the token and photos when the app is mounted or when called from paginator if token is invalid or getphotos returns an error.
  getTokenAndPhoto(page?, id?) { 
    this.haveCards = false
    this.authService.getToken().pipe(
      concatMap((token) => {
        console.log(token);
        return this.photosService.getPhotos(page, id);
      })
    ).subscribe((result) => {
      console.log(result);
      if(result.pictures) {
        this.cards = result;
        this.haveCards = true
      } else {
        //Info from service which i used to show the modal
      }
    })
    
  }

  openDialog(id) {
    //here consume service to take information of specific photo, giving id but doesnt work for %7D into parameters. Sorry but i havent got more time
    // this.getTokenAndPhoto(null, id)

    const dialogRef = this.dialog.open(ImageViewComponent, {
      data: {
        info: 'This object had the information of specific id'
      }
    });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

  nextOrPrevious(event) {
    this.getTokenAndPhoto(event.pageIndex, null);
  }
}
