import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss']
})
export class PostUpdateComponent implements OnInit {

  postForm!: FormGroup;
  urlRegex!: RegExp;
  // @Output() newItemEvent = new EventEmitter<string>();
  //TODO
  // @Output() postUpdate = new EventEmitter<Observable<Post>>();
  // @Output() onKeyUp: EventEmitter<Observable<Post>> = new EventEmitter();
  // @Input() postUpdate$!: Observable<Post>;
  @Input() postUpdate!: Post;

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    // this.newItemEvent.emit("test");
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.postForm = this.fb.group(
      {
        title: [null, Validators.required],
        description: [null, Validators.required],
        imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
        location: [null]
      },
      // {
      //   updateOn: 'blur'
      // }
    )

  }

  // test Output
  // emitInputData($event: any) {
  //   console.log('$event.target.value : ' + $event.target.value);
  //   this.onKeyUp.emit($event.target.value);
  // }

  // addNewItem(value: string) {
  //   this.newItemEvent.emit(value);
  // }

  onUpdatePost() {
    console.log(this.postForm.value);
    this.postService.updatePost(this.postUpdate.id, this.postForm.value).pipe(
      tap(() => {
        this.router.navigateByUrl('posts');
      })
    ).subscribe();
   }

}
