import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post$! : Observable<Post>;
  alreadyLiked = false;
  libelleBouton!: string;
  
  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {

    const id = this.route.snapshot.params.id;
    console.log(id);
    this.post$ = this.postService.getOnePost(id);
  
    if(!this.alreadyLiked) {
      this.libelleBouton = "🤙 J'aime";
    } else {
      this.libelleBouton = "👎 J'aime plus";
    }
  }
  
  onReactToThePicture(id: number){
  
    if(!this.alreadyLiked) {
      this.post$ = this.postService.updatePost(id, 'like').pipe(
        tap( () => {
          this.alreadyLiked = true;
          this.libelleBouton = "👎 J'aime plus";
        }
        )
      )
    } else {
      this.post$ = this.postService.updatePost(id, 'unLike').pipe(
        tap( () => {     
          this.alreadyLiked = false;
          this.libelleBouton = "🤙 J'aime";
        }
        )
      );

    }
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
