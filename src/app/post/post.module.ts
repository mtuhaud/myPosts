import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AddPostComponent } from "./components/add-post/add-post.component";
import { PostContentComponent } from "./components/post-content/post-content.component";
import { PostDetailComponent } from "./components/post-detail/post-detail.component";
import { PostsListComponent } from "./components/posts-list/posts-list.component";
import { PostRoutingModule } from "./post-routing.module";



@NgModule({
  declarations: [
    AddPostComponent,
    PostContentComponent,
    PostsListComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    PostRoutingModule
  ],
  exports: [
    AddPostComponent,
    PostContentComponent,
    PostsListComponent,
    PostDetailComponent
  ]
})
export class PostModule { }
