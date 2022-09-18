import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  newsletter!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onRedirectToPosts(): void {
    this.router.navigateByUrl('posts');
  }

  submitForm(newsletterForm: NgForm): void {
    console.log(newsletterForm.value);
  }

}
