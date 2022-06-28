import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddPostComponent } from "./add-post/add-post.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostsListComponent } from "./posts-list/posts-list.component";

const routes: Routes = [
    { path: '', component: HomePageComponent},
    { path: 'posts', component: PostsListComponent},
    { path: 'posts/:id', component: PostDetailComponent},
    { path: 'add-post', component: AddPostComponent}
];

@NgModule(
    {
        imports: [
            RouterModule.forRoot(routes)
            ],
        exports: [
            RouterModule
        ]
    }
)
export class AppRoutingModule {

}