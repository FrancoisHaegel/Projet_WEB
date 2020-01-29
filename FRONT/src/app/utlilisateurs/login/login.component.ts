import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { Store } from '@ngxs/store';
import { DtlUser } from '../../articles/shared/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    creationCompte = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authentificationService: AuthentificationService,
        private store : Store,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

      this.route.queryParams.subscribe(params => {
        this.creationCompte = params['creationCompte'] || false;
      });
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authentificationService.login(this.f.email.value, this.f.password.value).subscribe(
            res  => {

              if(res.token)
              {
                localStorage.setItem('jwt_token', res.token);
                localStorage.setItem('login', res.id);
                this.store.dispatch(new DtlUser(res.id));
                this.router.navigate(['/informations']);
              }
              else
              {
                this.loading = false;
                this.error = res.Erreur;
              }
            }
          )
    }
}
