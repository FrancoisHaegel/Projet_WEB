import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getListeArticles() : Observable<any>{
    return this.http.get<Article[]>(environment.url + "/api/articles");
  }

  getArticle(id : number) : Observable<Article>{
    return this.http.get<Article>(environment.url + "/api/articles/" + id);
  }
}
