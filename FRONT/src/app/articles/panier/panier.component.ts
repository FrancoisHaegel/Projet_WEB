import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { DelArticle } from '../shared/article.action';
import { Article } from 'src/app/models/article';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.sass']
})
export class PanierComponent implements OnInit {

  panier: Observable<Article[]>;
  total: number = 0;
  nbArticles: number = 0;

  constructor(private store: Store, private router: Router) {
    this.store.select(state => state.articles.articles).subscribe (u => this.nbArticles = u.length);
    this.panier = this.store.select(state => state.articles.articles);
    this.panier.subscribe(lists=>{
      if(lists.length == 0)
        this.total = 0;
      else
        {
          lists.forEach((article, index)=>
          {
            if(index == 0)
              this.total = Number(article.price)
            else
              this.total += Number(article.price)
          }
        )}
      });
  }

  ngOnInit() {
    if(localStorage.getItem('jwt_token') == null)
    {
      this.router.navigate(['/']);
    }
  }

  supprimerDuPanier(article: Article)
  {
      this.delArticle (article);
  }

  delArticle(article: Article)
  {
    this.store.dispatch(new DelArticle(article));
  }
}
