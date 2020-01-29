import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { HeaderComponent } from './structure/header/header.component';
import { FooterComponent } from './structure/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhonePipe } from "./models/phonepipe";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AccueilComponent } from './structure/accueil/accueil.component';
import { LoginComponent } from './utlilisateurs/login/login.component';
import { ArticlesState } from './articles/shared/article.state';
import { TokenInterceptor } from './service/token-interceptor';
import { UserState } from './articles/shared/user.state';
import { User } from './models/user';
import { RecapitulatifComponent } from './utlilisateurs/recapitulatif/recapitulatif.component';

const routes: Routes = [
  {
    path: '',
    component : AccueilComponent,
  },
  {
    path: 'register',
    loadChildren : './utlilisateurs/formulaire/formulaire.module#FormulaireModule',
  },
  {
    path: 'listeArticles',
    loadChildren : './articles/liste-articles/liste-articles.module#ListeArticlesModule',
  },
  {
    path: 'panier',
    loadChildren : './articles/panier/panier.module#PanierModule',
  },
  {
    path: 'detail',
    loadChildren : './articles/detail/detail.module#DetailModule'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'informations',
    component: RecapitulatifComponent,
  }


];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    LoginComponent,
    RecapitulatifComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([ArticlesState, UserState]),
  ],
  providers: [
    PhonePipe,
    {
      provide : HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
