import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  myToken:any = localStorage.getItem('userToken');

  constructor(private httpClient : HttpClient) { }

  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}/api/v1/cart`, 
      {
        "productId": id
    }, 

    {
      headers:{
        token: this.myToken
      }
    }

    )
  }

  getLoggeddUserCart():Observable<any>{
    return this.httpClient.get(`${environment.baseURL}/api/v1/cart`,
      {
        headers:{
          token: this.myToken
        }
      }
    )
  }

  removeCartItem(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseURL}/api/v1/cart/${id}`, 
      {
        headers:{
          token:this.myToken
        }
      }
     )
  }

  updateProductQuantity(id:string, newCount:number):Observable<any>{
    return this.httpClient.put(`${environment.baseURL}/api/v1/cart/${id}`, 
      {
        "count":newCount
      }
      , 
      {
        headers:{
          token: this.myToken
        }
      }
    )
  }
}
