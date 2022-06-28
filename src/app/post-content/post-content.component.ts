import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit{

@Input() post!: Post;
alreadyLiked = false;
libelleBouton!: string;

constructor(private postService: PostService, private router: Router){}

ngOnInit(): void {

  if(!this.alreadyLiked) {
    this.libelleBouton = "🤙 J'aime";
  } else {
    this.libelleBouton = "👎 J'aime plus";
  }
}

onReactToThePicture(id: number){

  if(!this.alreadyLiked) {
    this.postService.updatePost(id, 'like').pipe(
      map(value => this.post = value),
      tap( () => {
        this.alreadyLiked = true;
        this.libelleBouton = "👎 J'aime plus";
      })
    ).subscribe();
  } else {
    this.postService.updatePost(id, 'unLike').pipe(
      map( value => this.post = value),
      tap( () => {
        this.alreadyLiked = false;
        this.libelleBouton = "🤙 J'aime";
      } )
    ).subscribe();
  }
}

onRedirectToDetail(alreadyLiked: boolean, id: number): void{
  this.router.navigateByUrl("posts/" + id);
}

getColor(like: number){
  let color = "black";
  if(like > 5) {
    color = "green";
  }
  return color;
}

// autre façon de faire
// onLikePhoto() {
//   this.alreadyLiked = true;
//   this.like++;
// }
// onDislikePhoto() {

//   this.alreadyLiked = false;
//   this.like--;
// }

}
