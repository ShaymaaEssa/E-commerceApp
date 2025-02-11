import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService = inject(AuthService);
  isLoading :boolean = false;
  msgError :string = '';

  loginForm: FormGroup = new FormGroup({
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)])
  })

  submitForm():void{
    if(this.loginForm.valid){
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoading = false;
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          this.isLoading = false;
          this.msgError = err.error.message;
        },
      });
    }

  }
}
