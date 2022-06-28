import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  interval$!: Observable<string>;

  ngOnInit(): void {
    // interval(1000).pipe(
    //   tap(value => console.log("value " + value ))
    // )
    // .subscribe(value => console.log(value % 3 !== 0 ? 'Tick' : 'BANG'));

    // this.interval$ = interval(1000).pipe(
    //   filter( value => value % 3 === 0),
    //   map(value => value % 2 === 0 ? value + ' est pair' : value + ' est impair'),
    //   tap(text => this.logger(text)),
    // )
  }

  logger(text: string) {
    console.log("Log: " + text);
  }
}
