import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading :boolean = false;
  msgError :string = '';
  success: string = '';

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
          if(res.message === 'success'){
            this.msgError = '';
            this.success = "Login Successfully!";

            alert(this.success);
            setTimeout(()=>{
              //navigate login path
            this.router.navigate(['/home']);
            }, 1000)
            
  
          }
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
