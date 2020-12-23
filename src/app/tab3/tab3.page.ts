import { Component } from '@angular/core';
import { MovieDetail, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements ViewWillEnter {

  movies: MovieDetail[] = [];
  genres: Genre[] = [];

  favouriteGenre: any[] = [];

  constructor(
    private dataLocal: DataLocalService,
    private movieService: MoviesService
  ) {}

  async ionViewWillEnter() {

    this.movies = await this.dataLocal.loadFavourites();
    this.genres = await this.movieService.loadGenres();

    this.moviesPerGenre( this.genres, this.movies );

  }

  moviesPerGenre( genres: Genre[], movies: MovieDetail[] ) {

    this.favouriteGenre = [];

    genres.forEach( genre => {

      this.favouriteGenre.push({
        genre: genre.name,
        movies: movies.filter( mov => {

          return mov.genres.find( gen => gen.id === genre.id );

        })
      });

    })

  }

}
