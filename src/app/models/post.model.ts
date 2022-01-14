import { CommonAPIStates } from './common-state.model';

export interface IPost {
  id: number,
  title: string,
  description: string
}

export interface AllPostState extends CommonAPIStates {
  page?: number
}

export interface OnePostState extends CommonAPIStates {
}
