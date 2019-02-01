import { Injectable } from '@angular/core';

import { Component } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from './film';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Star War Films';

  dataUrl = 'https://swapi.co/api/films/';

  films = [];
  error = null;

  //this variable will indicate the state of the application
  //-1 indicates that the page is still loading
  //0 indicates that we have loaded all the movies already
  //more than one it lists the films accoring with their array position +1
  state = -1;

  constructor(private http: HttpClient) { }

  //this function gets all the films from the API
  getFilms(): Observable<any>  {
    return this.http.get<any>(this.dataUrl);
  }

  //this function changes the state of the application
  //the first parammeter is the item and the other one is the page where it is placed
  changeState(event, item, page): void {

    item++;
    if (page > 1)
    {
      //for example for page 2
      //2 - 1 = 1
      //we multiply it by 5
      //and now we add it to the item
      //for example the first item in the second page it will be 6
      //the first item in the third page will be 11
      page--;
      page = page * 5;
      item = item + page;
    }

    //we save the value in another variable
    this.state = item;
  }

  //in the beginning it will fetch the data from the api
  //and when it will have it it will say so to the application
  ngOnInit(): void
  {
    this.getFilms()
    .subscribe((data) => {
      this.films = data.results;
      this.state = 0;
      console.log(data.results);
    })
    error => this.error = error;
  }
}
