import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { Article } from '../../models/article';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { AddArticle, DtlArticle } from '../shared/article.action';

@Component({
  selector: 'app-liste-articles',
  templateUrl: './liste-articles.component.html',
  styleUrls: ['./liste-articles.component.sass']
})
export class ListeArticlesComponent implements OnInit {

  constructor(private articleService : ArticleService, private store : Store, private router : Router) { }
  articles : Article[] = [];
  inputFilter : string = "";
  type : string = "";

  ngOnInit()
  {
    this.articleService.getListeArticles().subscribe(
      (value) => this.articles = value,
      (error) => {
        this.router.navigate(['/']);
    });
  }

  public majType(type: string)
  {
    this.type = type;
  }

  public majFiltre(filte: string)
  {
   this.inputFilter = filte;
  }

  ajouterAuPanier(article: Article)
  {
      this.addArticle (article);
  }

  addArticle(article: Article)
  {
    this.store.dispatch(new AddArticle(article));
  }

  detailArticle(article: Article)
  {
    this.dtlArticle (article.id);
    this.router.navigate(['/detail']);
  }

  dtlArticle(id: number)
  {
    this.store.dispatch(new DtlArticle(id));
  }

}
