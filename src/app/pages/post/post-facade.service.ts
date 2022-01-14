import { StoreService } from '../../services/store.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostFacadeService {

  constructor(private _store: StoreService) { }

  getOnePost$() {
    return this._store.onePost$;
  }

  fetchOnePost(id: number) {
    this._store.fetchOnePost(id);
  }
}
