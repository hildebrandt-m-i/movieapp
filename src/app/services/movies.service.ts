import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseMDB, MovieDetail, ResponseCredits, ResponseSearch, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularPage = 0;
  genres: Genre[] = [];

  constructor( private http: HttpClient ) { }

  private executeQuery<T>( query: string ) {

    query = URL + query;
    query += `&api_key=${ apiKey }&language=en&include_image_language=en`;

    return this.http.get<T>( query );

  }

  getPopularMovies() {

    this.popularPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularPage }`;
    return this.executeQuery<ResponseMDB>(query);

  }

  getFeature() {

    const today = new Date();
    const lastDay = new Date( today.getFullYear(), today.getMonth() + 1, 0 ).getDate();
    const month = today.getMonth() + 1;

    let monthString;

    if ( month < 10 ) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const start = `${ today.getFullYear() }-${ monthString }-01`;
    const end = `${ today.getFullYear() }-${ monthString }-${ lastDay }`;

    return this.executeQuery<ResponseMDB>(`/discover/movie?primary_release_date.gte=${ start }&primary_release_date.lte=${ end }`);
  }

  getMovieDetail( id: string ) {

    return this.executeQuery<MovieDetail>(`/movie/${ id }?a=1`);

  }

  getMovieActors( id: string ) {

    return this.executeQuery<ResponseCredits>(`/movie/${ id }/credits?a=1`);

  }

  searchMovie( movie: string ) {

    return this.executeQuery(`/search/movie?query=${ movie }`);

  }

  loadGenres(): Promise<Genre[]> {

    return new Promise( resolve => {
      this.executeQuery(`/genre/movie/list?a=1`)
          .subscribe( resp => {
            this.genres = resp['genres'];
            resolve( this.genres );
          });
    });

  }

}
