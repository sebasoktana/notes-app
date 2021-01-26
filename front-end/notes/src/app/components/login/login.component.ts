import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  formSubmitAttempt: boolean = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  ngOnInit() {
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
      (this.form.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }

}
