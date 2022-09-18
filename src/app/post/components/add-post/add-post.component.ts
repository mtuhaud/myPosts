import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post } from '../../../core/models/post.model';
import { PostService } from '../../../core/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  postForm!: FormGroup;

  postPreview$!: Observable<Post>;

  urlRegex!: RegExp;

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) { }

  ngOnInit(): void {

    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.postForm = this.fb.group(
      {
        title: [null, Validators.required],
        description: [null, Validators.required],
        imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
        location: [null]
      },
      {
        updateOn: 'blur'
      }
    )

    this.postPreview$ = this.postForm.valueChanges.pipe(
      map(value => (
        {
          ...value,
          date: [new Date()],
          like: 0,
          id: 0
        }
      ))
    )
  }

  onSubmitPostForm(): void {
    console.log(this.postForm.value);
    this.postService.addPost(this.postForm.value).pipe(
      tap(() => {
        this.router.navigateByUrl('posts');
      })
    ).subscribe();
  }

}
