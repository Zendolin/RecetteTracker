import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup
  errorMessage: string

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.signinForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required]
      }
    )
  }

  onSubmit(){
    const email = this.signinForm.get("email").value
    const password = this.signinForm.get("password").value


    this.authService.signIn(email, password).then(
      () => {
        this.router.navigate(["/"])
      },
      (error) => {
        this.errorMessage = error
      }
    )
  }

}