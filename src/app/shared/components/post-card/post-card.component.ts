import { IPost } from '../../../models/post.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: IPost | null = null;
  @Input() needDeleteButton: boolean = true;
  @Output() deletePost = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  handleDeletePost(id: number | undefined) {
    if (id) {
      this.deletePost.emit(id);
    }
  }
}
