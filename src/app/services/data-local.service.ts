import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MovieDetail } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  movies: MovieDetail[] = [];

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.loadFavourites();
  }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  saveMovie( movie: MovieDetail ) {

    let exist = false;
    let message = '';

    for ( const mov of this.movies ) {
      if ( mov.id === movie.id ) {
        exist = true;
        break;
      }
    }

    if ( exist ) {
      this.movies = this.movies.filter( mov => mov.id !== movie.id );
      message = 'The movie has been removed';
    } else {
      this.movies.push( movie );
      message = 'The movie has been added to favourites';
    }

    this.presentToast( message );
    this.storage.set( 'movies', this.movies );

    return !exist;

  }

  async loadFavourites() {

    const movies = await this.storage.get('movies');
    this.movies = movies || [];
    return this.movies;

  }

  async existMovie( id: any ) {

    await this.loadFavourites();
    const exist = this.movies.find( movie => movie.id === id );

    return (exist) ? true : false;

  }

}
