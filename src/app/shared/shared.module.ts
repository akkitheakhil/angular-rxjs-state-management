import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './components/post-card/post-card.component';
import { ModalComponent } from './components/modal/modal.component';


const CommonExports = [
  PostCardComponent,
  ModalComponent
]

@NgModule({
  declarations: [
    ...CommonExports
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...CommonExports
  ]
})
export class SharedModule { }
