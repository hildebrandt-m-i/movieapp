import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { PairsPipe } from './pairs.pipe';

@NgModule({
  declarations: [ImagenPipe, PairsPipe],
  exports: [
    ImagenPipe,
    PairsPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
