import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { Store } from '@ngxs/store';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recapitulatif',
  templateUrl: './recapitulatif.component.html',
  styleUrls: ['./recapitulatif.component.sass'],
})
export class RecapitulatifComponent implements OnInit {

  //@Input() user: User;
  idUser : number;
  user: User;

  constructor(private store: Store, private userService : AuthentificationService, private router : Router) {
    this.user = new User();
    this.store.select(state => state.user.userId).subscribe (u => this.idUser = u);
    this.userService.getUser(+localStorage.getItem('login')).subscribe(value => this.user = value[0]);
  }

  ngOnInit() {
    if(localStorage.getItem('jwt_token') == null)
    {
      this.router.navigate(['/']);
    }
  }

}
