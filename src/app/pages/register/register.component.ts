import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { validateHeaderName } from 'http';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  isLoading:boolean = false;
  msgError:string='';
  success:string = '';

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]), 
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, this.confirmPassword)

  

  submitForm():void{
    if(this.registerForm.valid){
      this.isLoading = true;
      
    
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoading = false;
          if(res.message === 'success'){
            this.msgError = '';
            this.success = "Account Created Successfully!";

            alert(this.success);
            setTimeout(()=>{
              //navigate login path
            this.router.navigate(['/login']);
            }, 1000)
            
  
          }
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          this.isLoading = false;
          //if message already exist show message to user
          this.msgError = err.error.message;
        },
        
      });
    }
    else {
      this.registerForm.markAllAsTouched();
    }
    
  }

  

  confirmPassword(group: AbstractControl){
    const password =  group.get('password')?.value;
    const rePassword =  group.get('rePassword')?.value;
    return password === rePassword ? null : {mismatch:true};
  
  }
}
