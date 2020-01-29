import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulaireRoutingModule } from './formulaire-routing.module';
import { FormulaireComponent } from './formulaire.component';
import { RecapitulatifComponent } from '../recapitulatif/recapitulatif.component';
import { PhonePipe } from '../../models/phonepipe';
import { ErreursDirective } from '../../erreurs.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [    
    FormulaireComponent,
    PhonePipe,
    ErreursDirective,
  ],
  imports: [
    CommonModule,
    FormulaireRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FormulaireModule { }
