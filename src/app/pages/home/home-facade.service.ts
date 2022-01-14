import { StoreService } from '../../services/store.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IPost } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class HomeFacadeService {

  constructor(private _store: StoreService) { }

  getAllPosts$() {
    return this._store.allPosts$;
  }

  fetchAllPosts() {
    this._store.fetchAllPosts();
  }

  searchPosts(keyword: string) {
    this._store.searchPosts(keyword);
  }

  deletePost(id: number) {
    this._store.deletePost(id);
  }

  addPost(post: Partial<IPost>) {
    this._store.addNewPost(post);
  }
}
