import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../models/article';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { RstArticle } from 'src/app/articles/shared/article.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  panier: Observable<Article>;
  nbArticles : number;
  isLoggedIn: boolean;


constructor(private store: Store, private router : Router, private authService: AuthentificationService) {
    this.store.select(state => state.articles.articles).subscribe (u => this.nbArticles = u.length);
   }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout(evt) {
    localStorage.removeItem('jwt_token');
    this.store.dispatch(new RstArticle());
    this.router.navigate(['/login']);
  }

}
