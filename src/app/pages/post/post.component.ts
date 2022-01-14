import { PostFacadeService } from './post-facade.service';
import { APIStatus } from '../../models/common-state.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  apiStatus = APIStatus;

  getOnePost$ = this.facade.getOnePost$();

  constructor(private activeRoute: ActivatedRoute, private facade: PostFacadeService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(({ id }) => {
      const _id = Number(id);
      this.facade.fetchOnePost(_id);
    })
  }



}
