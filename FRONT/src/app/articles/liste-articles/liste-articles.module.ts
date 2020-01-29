import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListeArticlesRoutingModule } from './liste-articles-routing.module';
import { FiltreArticlesComponent } from '../articles-filter/articles-filter.component';
import { ArticlesPipe } from '../../models/articles.pipe';
import { ListeArticlesComponent } from './liste-articles.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FiltreArticlesComponent,
    ArticlesPipe,
    ListeArticlesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ListeArticlesRoutingModule
  ]
})
export class ListeArticlesModule { }
