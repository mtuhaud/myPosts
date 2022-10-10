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
  libelleBouton!: string;
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
    console.log(id);
    //this.post$ = this.postService.getOnePost(id);

    this.post$ = this.postService.getOnePost(id).pipe(
      tap(value => 
        this.alreadyLiked = value.likeStatus,
      ),
      tap( () =>
      this.libelleBouton = this.alreadyLiked === true ? "👎 J'aime plus" : "🤙 J'aime"
      )
    );
  
    console.log('alreadyLiked = ' + this.alreadyLiked);
    // this.libelleBouton = this.alreadyLiked === true ? "👎 J'aime plus" : "🤙 J'aime";

  }
  
  onReactToThePicture(id: number){
  
    console.log('debut on react : alreadyLiked = ' + this.alreadyLiked);
    let like = this.alreadyLiked === true ? false : true;
    console.log('debut on react : like = ' + like);
    this.post$ = this.postService.updateLikeStatus(id, like).pipe(
      tap(value => 
      this.libelleBouton = value.likeStatus === true ? "👎 J'aime plus" : "🤙 J'aime"),
      tap( () =>
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
