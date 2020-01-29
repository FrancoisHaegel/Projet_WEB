import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../models/mustMatch';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.sass']
})
export class FormulaireComponent implements OnInit {

  registerForm : FormGroup;
  // lorsque l'utilisateur clique sur valider
  validation : boolean = false;
  // lorsque la saisie est bonne
  validationOK : boolean = false;
  user : User = new User();

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthentificationService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      address: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', [Validators.required]],
      passwordVerification: ['', [Validators.required]],
    },
    {
      validator: MustMatch('password', 'passwordVerification')
    });
  }

  get f() { return this.registerForm.controls; }

  creerCompte()
  {
    this.validation = true;

   if (this.registerForm.valid) {
      this.validationOK = true;

      this.authService.register(
        this.registerForm.controls['email'].value,
        this.registerForm.controls['firstName'].value,
        this.registerForm.controls['lastName'].value,
        this.registerForm.controls['password'].value,
        this.registerForm.controls['passwordVerification'].value,
        this.registerForm.controls['country'].value,
        this.registerForm.controls['city'].value,
        this.registerForm.controls['postalCode'].value,
        this.registerForm.controls['address'].value,
        this.registerForm.controls['phoneNumber'].value
      ).subscribe(
        (user) => {
          this.user = user;
          this.router.navigate(['/login'], { queryParams: { creationCompte: true } });
        },
        (error) => {
          this.router.navigate(['/']);
      });
   }
  }
}
