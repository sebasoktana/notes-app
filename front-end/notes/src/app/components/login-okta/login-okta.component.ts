import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OktaAuthService } from '@okta/okta-angular';

//import * as OktaSignIn from '@okta/okta-signin-widget';
const OktaSignIn = require('@okta/okta-signin-widget');

@Component({
  selector: 'app-login-okta',
  templateUrl: './login-okta.component.html',
  styleUrls: ['./login-okta.component.css']
})
export class LoginOktaComponent implements OnInit {

  form: FormGroup;
  formSubmitAttempt: boolean = false;
  badCredentials: boolean = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    // Show the widget when prompted, otherwise remove it from the DOM.

  }

  async ngOnInit() {
    document.body.classList.add('bg-img');
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-img');
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
      (this.form.get(field)?.untouched && this.formSubmitAttempt) ||
      (this.badCredentials)
    );
  }

  async onSubmit() {
    if (this.form.valid) {
      let response = await this.authService.loginOkta(this.form.value);
      if (response == undefined || (<any>response).status != 'SUCCESS') {
        this.badCredentials = true;
      }

    }
    this.formSubmitAttempt = true;
  }

}
