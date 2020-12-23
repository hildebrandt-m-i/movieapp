import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';
import { DetailComponent } from '../components/detail/detail.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  searchText = '';
  searching = false;
  movies: Movie[] = [];
  suggestions: string[] = ['Spiderman', 'Avengers'];

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
  ) {}

  search( event: any ) {

    const value = event.detail.value;

    if ( value.length === 0 ) {
      this.searching = false;
      this.movies = [];
      return;
    }

    this.searching = true;

    this.moviesService.searchMovie( value )
        .subscribe( resp => {
          this.movies = resp['results'];
          this.searching = false;
        });

  }

  async showDetail( id: string ) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
