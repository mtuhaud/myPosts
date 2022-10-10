import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit{

@Input() post!: Post;
alreadyLiked!: boolean;
libelleBouton!: string;

constructor(private postService: PostService, private router: Router, private route: ActivatedRoute){}

ngOnInit(): void {

  console.log(this.post.likeStatus);
  this.libelleBouton = this.post.likeStatus === true ? "👎 J'aime plus" : "🤙 J'aime";
}

onReactToThePicture(id: number){

  let like = this.post.likeStatus === true ? false : true;
  console.log('like = ' + like)
  this.postService.updateLikeStatus(this.post.id, like).pipe(
    map(value => this.post = value),
    tap( value =>
      this.libelleBouton = value.likeStatus === true ? "👎 J'aime plus" : "🤙 J'aime"
    )
  )
  .subscribe();
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
