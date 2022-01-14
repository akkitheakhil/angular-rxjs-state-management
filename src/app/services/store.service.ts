import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, switchMap, take } from 'rxjs';
import { AllPostState, OnePostState, IPost } from '../models/post.model';
import { APIStatus } from '../models/common-state.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly State = {
    allPost: new BehaviorSubject<AllPostState>({
      data: [],
      error: null,
      state: APIStatus.loading
    }),
    onePost: new BehaviorSubject<OnePostState>({
      data: {},
      error: null,
      state: APIStatus.loading
    }),
  }

  constructor(private httpService: HttpService) { }

  fetchAllPosts() {
    this.allPosts = {
      data: [],
      error: null,
      state: APIStatus.loading
    }
    this.httpService.getPost().pipe(take(1),
      map((data) => {
        return data.sort((a, b) => b.id - a.id);
      }),
      switchMap((data) => {
        this.allPosts = { state: APIStatus.loaded, data, error: null };
        return this.State.allPost.asObservable();
      }),
      catchError((err) => {
        this.allPosts = { state: APIStatus.loaded, data: [], error: err };
        return this.State.allPost.asObservable();
      })).subscribe();
  }

  set allPosts(postResponse: { state: APIStatus, data: any, error: any }) {
    this.State.allPost.next(postResponse)
  }

  get allPosts$() {
    return this.State.allPost.asObservable();
  }

  searchPosts(keyword: string) {
    keyword ? this.querySearch(keyword) : this.fetchAllPosts()
  }

  querySearch(keyword: string) {
    this.allPosts = {
      data: [],
      error: null,
      state: APIStatus.loading
    }
    this.httpService.searchPostComment(keyword).pipe(take(1),
      switchMap((data) => {
        this.allPosts = { state: APIStatus.loaded, data, error: null };
        return this.State.allPost.asObservable();
      }),
      catchError((err) => {
        this.allPosts = { state: APIStatus.loaded, data: [], error: err };
        return this.State.allPost.asObservable();
      })).subscribe();
  }

  deletePost(id: number) {
    this.allPosts = {
      data: [],
      error: null,
      state: APIStatus.loading
    }
    this.httpService.deleteOnePost(id).pipe(take(1), switchMap((data) => {
      this.fetchAllPosts();
      return this.State.allPost.asObservable();
    }),
      catchError((err) => {
        this.allPosts = { state: APIStatus.loaded, data: [], error: err };
        return this.State.allPost.asObservable();
      })).subscribe();
  }

  addNewPost(post: Partial<IPost>) {
    this.allPosts = {
      data: [],
      error: null,
      state: APIStatus.loading
    }
    this.httpService.postOneComment(post).pipe(take(1), switchMap((data) => {
      this.fetchAllPosts();
      return this.State.allPost.asObservable();
    }),
      catchError((err) => {
        this.allPosts = { state: APIStatus.loaded, data: [], error: err };
        return this.State.allPost.asObservable();
      })).subscribe();
  }

  fetchOnePost(id: number) {
    this.onePost = {
      data: {},
      error: null,
      state: APIStatus.loading
    }
    this.httpService.getOnePost(id).pipe(
      switchMap((data) => {
        this.onePost = { state: APIStatus.loaded, data, error: null };
        return this.State.allPost.asObservable();
      }),
      catchError((err) => {
        this.onePost = { state: APIStatus.loaded, data: [], error: err };
        return this.State.allPost.asObservable();
      })).subscribe();
  }

  set onePost(postResponse: { state: APIStatus, data: any, error: any }) {
    this.State.onePost.next(postResponse);
  }

  get onePost$() {
    return this.State.onePost.asObservable();
  }
}
