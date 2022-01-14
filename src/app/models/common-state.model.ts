export enum APIStatus {
  loading = 'LOADING',
  loaded = 'SUCCESS',
  error = 'ERROR'
}

export interface CommonAPIStates {
  state: APIStatus,
  data: any,
  error: any,
}
