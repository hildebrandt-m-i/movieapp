import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieDetail, Cast } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() id;
  movie: MovieDetail = {};
  actors: Cast[] = [];
  hidden = 150;
  isFavourite = 'star-outline';

  slideOptsActors = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(
    private movieService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService
  ) { }

  ngOnInit() {

    this.dataLocal.existMovie( this.id )
        .then( exist => this.isFavourite = ( exist ) ? 'star' : 'star-outline' );

    this.movieService.getMovieDetail( this.id )
        .subscribe( detail => {
          this.movie = detail;
        });

    this.movieService.getMovieActors( this.id )
        .subscribe( actors => {
          this.actors = actors.cast;
        });

  }

  back() {

    this.modalCtrl.dismiss();

  }

  favourite() {

    const exist = this.dataLocal.saveMovie( this.movie );
    this.isFavourite = ( exist ) ? 'star' : 'star-outline';

  }

}
