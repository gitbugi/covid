import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  countys = [];

  url = "https://coronavirus.m.pipedream.net/";

  getglobal(): Observable<any> {
    return this.http.get<any>(this.url)
  }
}
