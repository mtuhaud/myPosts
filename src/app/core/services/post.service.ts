import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { Post } from "../models/post.model";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private httpClient: HttpClient)  {};

    myPosts: Post[] =  [];

    url: string = "http://localhost:3000/posts/"

    getPosts(): Observable<Post[]> {
      return this.httpClient.get<Post[]>(this.url);
    }

    getOnePost(id: number): Observable<Post> {
      return this.httpClient.get<Post>(this.url + id);
    }

    //   getPostById(id: number): Post {
    //       let findPost = this.myPosts.find(post => post.id === id);
    //       console.log("findPost =" + findPost?.title);
    //       if(findPost) {
    //         return findPost;
    //       } else {
    //           throw new Error('Post not found');
    //       }
    //   }

    addPost(postValue: Post): Observable<Post> {
      return this.getPosts().pipe(
        map(postArray => [...postArray].sort((a,b) => a.id - b.id)),
        map(sortedPostArray => sortedPostArray[sortedPostArray.length - 1]),
        map(previousPost => ({
          ...postValue,
          date: new Date(),
          like: 0,
          id: previousPost.id + 1
        })),
        switchMap( 
          newPost => this.httpClient.post<Post>(this.url, newPost))

      )

    }

    updateLikeStatus(id: number, likeStatus: 'like' | 'unLike'): Observable<Post> {
      return this.getOnePost(id).pipe(
        map(value => ({
            ...value,
            like: value.like + (likeStatus === 'like' ? 1 : -1)
        })),
        switchMap(updatedPost => 
            this.httpClient.put<Post>(this.url + id, updatedPost)
        )
      )
    }

    updatePost(id: number, post: Post) {
      return this.getOnePost(id).pipe(
        map(value => (
          {
            ...value,
            title: post.title,
            description: post.description,
            imageUrl: post.imageUrl,
            location: post.location,
          }
        )),
        switchMap( updatedPost =>
          this.httpClient.put<Post>(this.url + id, updatedPost)
          )
      )
    }

    deletePost(id: number) {
      return this.httpClient.delete<Post>(this.url + id);
    }


}