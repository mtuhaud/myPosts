import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {

  // myPosts!: Post[];

  myPosts$!: Observable<Post[]>;

  // destroy$!: Subject<boolean>;
  
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    // this.destroy$ = new Subject<boolean>();

    // interval(1000).pipe(
    //   takeUntil(this.destroy$),
    //   tap(console.log)
    // ).subscribe();
    this.myPosts$ = this.postService.getPosts();
  }

  ngOnDestroy(): void {
    // this.destroy$.next(true);
  }

}
