import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Token } from '@angular/compiler';
import { IUser } from '../../../shared/interfaces/iuser';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  myToken:any = localStorage.getItem('userToken');
  userData: IUser ={} as IUser;

  constructor(private httpClient : HttpClient) { }


  checkoutPayMent(id:string, data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress": data
      }, 
      {
        headers:{
          token:this.myToken
        }
      }
    )
  }

  getUsersOrders():Observable<any>{
    if(localStorage.getItem('userToken') !== null){
          this.userData =  jwtDecode(localStorage.getItem('userToken')!)
          console.log(this.userData);
        }

    return this.httpClient.get(`${environment.baseURL}/api/v1/orders/user/${this.userData.id}`);
  }


}
