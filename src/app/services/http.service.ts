import { HttpRoutesConstants } from '../constants/http-route.contants';
import { IPost } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  _apiRoutes = new HttpRoutesConstants()._apiEndpoints;

  constructor(private http: HttpClient) { }


  getPost() {
    const url = this._apiRoutes['getAllPost'].endpoint;
    return this.http.get<IPost[]>(url)
  }

  getOnePost(id: number) {
    const url = this._apiRoutes['getOnePost'].endpoint.replace('{{id}}', id.toString());
    return this.http.get<IPost>(url);
  }

  postOneComment(comment: Partial<IPost>) {
    const url = this._apiRoutes['createNewPost'].endpoint;
    return this.http.post<IPost>(url, comment);
  }

  searchPostComment(keyword: string) {
    const url = this._apiRoutes['searchPosts'].endpoint.replace('{{keyword}}', keyword);
    return this.http.get<IPost[]>(url);
  }

  deleteOnePost(id: number) {
    const url = this._apiRoutes['deleteOnePost'].endpoint.replace('{{id}}', id.toString());
    return this.http.delete(url);
  }
}
