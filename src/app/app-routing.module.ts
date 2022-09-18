import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { HomePageComponent } from "./home-page/components/home-page/home-page.component";


const routes: Routes = [
    { path: 'posts', loadChildren: () => import('./post/post.module').then(m => m.PostModule)},
    { path: '', component: HomePageComponent, canActivate: [AuthGuard]}
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