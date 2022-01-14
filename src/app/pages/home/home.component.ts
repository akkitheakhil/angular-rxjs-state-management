import { HomeFacadeService } from './home-facade.service';
import { APIStatus } from '../../models/common-state.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject, takeUntil, distinctUntilChanged, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isSearching: boolean = false;
  searchTerm: string = '';
  searchForm!: FormGroup;
  createPostFormGroup!: FormGroup;
  apiStatus = APIStatus;
  isAddModalOpen = false;

  onDestroy$ = new Subject();
  getAllPost$ = this.homeFacade.getAllPosts$();

  constructor(private homeFacade: HomeFacadeService, private formBuilder: FormBuilder) {
    this.homeFacade.fetchAllPosts();
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.createPostFormGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.liveSearch();
  }


  liveSearch(): void {
    this.searchForm.get('search')?.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((keyword: string) => {
        this.isSearching = !!keyword;
        this.searchTerm = keyword;
        this.homeFacade.searchPosts(keyword);
        return of();
      })
    ).subscribe();
  }

  handleDeletePostClick($event: any): void {
    const _id = Number($event);
    this.homeFacade.deletePost(_id);
  }

  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
  }

  createNewPost(event: any): void {
    event.preventDefault();
    if (this.createPostFormGroup.invalid) {
      return;
    }
    this.homeFacade.addPost(this.createPostFormGroup.value)
    this.createPostFormGroup.reset();
    this.closeAddModal();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}
