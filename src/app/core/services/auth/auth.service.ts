import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../../../shared/interfaces/iuser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: IUser ={} as IUser;
  private readonly router = inject(Router);
  
  constructor(private httpClient : HttpClient) {
  }



  sendRegisterForm(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}/api/v1/auth/signup`, data)
  }

  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}/api/v1/auth/signin`, data)
  }

  saveUserData():void{
    if(localStorage.getItem('userToken') !== null){
      this.userData =  jwtDecode(localStorage.getItem('userToken')!)
      console.log(this.userData);
    }
  }

  logOut():void{
    localStorage.removeItem('userToken');
    this.userData = {} as IUser;
    //navigate to login
    this.router.navigate(['/login']);

  }

  setEmailVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`, data )
  }

  setCodeVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`, data )
  }

  setResetPassword(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseURL}/api/v1/auth/resetPassword`, data )
  }
}
