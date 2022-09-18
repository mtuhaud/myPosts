import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { AddPostComponent } from "./components/add-post/add-post.component";
import { PostDetailComponent } from "./components/post-detail/post-detail.component";
import { PostsListComponent } from "./components/posts-list/posts-list.component";

const routes: Routes = [
    { path: '', component: PostsListComponent, canActivate: [AuthGuard]},
    { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard]},
    { path: ':id', component: PostDetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PostRoutingModule {

}