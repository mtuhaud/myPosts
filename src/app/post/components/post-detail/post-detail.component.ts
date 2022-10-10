import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post$! : Observable<Post>;
  alreadyLiked!: boolean;
  showUpdateBlock: boolean = false;

  // code pour Output
  // items: string[] = [];

  // addItem(newItem: string) {
  //   this.items.push(newItem);
  // }

  // sendPostFromChild(post: Observable<Post>) {
  //   this.post$ = post;
  // }
  
  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {

    const id = this.route.snapshot.params.id;
    this.post$ = this.postService.getOnePost(id).pipe(
      tap(value => 
        this.alreadyLiked = value.likeStatus,
      )
    );

  }
  
  onReactToThePicture(id: number){
    let like = this.alreadyLiked === true ? false : true;
    this.post$ = this.postService.updateLikeStatus(id, like).pipe(
      tap(() =>
        this.alreadyLiked = !this.alreadyLiked)
    );

  }

  onToggleUpdate() {
    this.showUpdateBlock = !this.showUpdateBlock;
  }

  receiveInput($event: any) {
    this.post$ = $event;
    // console.log('Input from child : ', this.inputFromChild);
  }
  
  onDeletePost(id: number) {
    this.postService.deletePost(id).pipe(
      tap(() => {
        this.router.navigateByUrl('posts')
      }
      )
    ).subscribe();
  }
  
  getColor(like: number){
    let color = "black";
    if(like > 5) {
      color = "green";
    }
    return color;
  }
  

}
