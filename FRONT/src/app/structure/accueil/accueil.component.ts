import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.sass']
})
export class AccueilComponent implements OnInit {

  commande: boolean = false;

  constructor(private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      this.commande = params['commande'] || false;
    });
  }

  ngOnInit() {
  }
}
