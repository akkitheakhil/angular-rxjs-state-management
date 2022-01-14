import { ICommonEndpoint } from '../models/common-api.model';
export class HttpRoutesConstants {

  API_DOMAIN_URL = 'http://localhost:3000/'

  public _apiEndpoints: { [key in string]: ICommonEndpoint } = {
    getAllPost: {
      endpoint: `${this.API_DOMAIN_URL}api/posts`
    },
    getOnePost: {
      endpoint: `${this.API_DOMAIN_URL}api/posts/{{id}}`
    },
    createNewPost: {
      endpoint: `${this.API_DOMAIN_URL}api/posts`
    },
    searchPosts: {
      endpoint: `${this.API_DOMAIN_URL}api/posts?q={{keyword}}`
    },
    deleteOnePost: {
      endpoint: `${this.API_DOMAIN_URL}api/posts/{{id}}`
    },
  }

}
