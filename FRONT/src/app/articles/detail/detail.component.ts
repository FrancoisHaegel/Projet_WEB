import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/article';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddArticle } from '../shared/article.action';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

  idArticle: number;
  article: Article;

  constructor(private store: Store, private articleService : ArticleService, private router : Router) {
    this.article = new Article();
    this.store.select(state => state.articles.detail).subscribe (u => this.idArticle = u);
    if(this.idArticle == 0)
    {
      this.router.navigate(['/listeArticles']);
    }
    else
    {
    this.articleService.getArticle(this.idArticle).subscribe(value => this.article = value[0]);
    }
  }

  ngOnInit() {
    if(localStorage.getItem('jwt_token') == null)
    {
      this.router.navigate(['/']);
    }
  }

  addToShoppingKart(article: Article)
  {
      this.addArticle (article);
  }

  retour()
  {
    this.router.navigate(['/listeArticles']);
  }

  addArticle(article: Article)
  {
    this.store.dispatch(new AddArticle(article));
  }
}
