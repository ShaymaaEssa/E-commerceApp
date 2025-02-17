import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  private readonly formBuilder=inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  msgError :string = '';
  success: string = '';

  step:number = 1;
  isLoading :boolean = false;

  verifyEmail: FormGroup = this.formBuilder.group({
    email:[null, [Validators.required, Validators.email]]
  })

  verifyCode: FormGroup = this.formBuilder.group({
    resetCode:[null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
  })

  resetPassword: FormGroup = this.formBuilder.group({
    email:[null, [Validators.required, Validators.email]],
    newPassword:[null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]]
    
  })

  verifyEmailSubmit():void{
    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);

    if(this.verifyEmail.valid){
      this.isLoading = true;
      this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
        next:(res)=>{
          this.isLoading = false;

          this.msgError = '';
          this.success = "Email Verified!";

          alert(this.success);
          
          console.log(res);
          if(res.statusMsg==="success"){
            this.step = 2;
          }

          console.log(this.verifyEmail.get('email')?.value);
          console.log(this.verifyEmail.value);
        },
        error:(err)=>{
          this.isLoading = false;
          console.log(err)
          alert(err.error.message)
          this.msgError = err.error.message;
        }
      })
    }

  }

  verifyCodeSubmit():void{
    if(this.verifyCode.valid){
      this.isLoading = true;
      this.authService.setCodeVerify(this.verifyCode.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          alert(res.status);
          console.log(res);
          if(res.status==="Success"){
            this.step = 3;
          }
        },
        error:(err)=>{
          this.isLoading = false;
          console.log(err)
          alert(err.error.message)
        }
      })
    }

  }

  resetPasswordSubmit():void{
    if(this.resetPassword.valid){
      this.isLoading = true;
      this.authService.setResetPassword(this.resetPassword.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          alert("Password Reset Successfully !");
          console.log(res);
          localStorage.setItem('userToken',res.token);
          this.authService.saveUserData();
          this.router.navigate(['/home']);
        },
        error:(err)=>{
          this.isLoading = false;
          console.log(err)
          alert(err.error.message);
        }
      })
    }

  }


}
