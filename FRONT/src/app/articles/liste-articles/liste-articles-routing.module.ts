import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeArticlesComponent } from './liste-articles.component';


const routes: Routes = [  
  {
    path: '',
    component : ListeArticlesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListeArticlesRoutingModule { }
