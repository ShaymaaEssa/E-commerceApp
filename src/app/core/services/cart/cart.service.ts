import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  numCartItem : BehaviorSubject<number> = new BehaviorSubject(0);
  
  constructor(private httpClient : HttpClient) { }

  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}/api/v1/cart`, 
      {
        "productId": id
    }

    )
  }

  getLoggeddUserCart():Observable<any>{
    return this.httpClient.get(`${environment.baseURL}/api/v1/cart`
    )
  }

  removeCartItem(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseURL}/api/v1/cart/${id}`
     )
  }

  updateProductQuantity(id:string, newCount:number):Observable<any>{
    return this.httpClient.put(`${environment.baseURL}/api/v1/cart/${id}`, 
      {
        "count":newCount
      }
      
    )
  }

  clearUserCart():Observable<any>{
    return this.httpClient.delete(`${environment.baseURL}/api/v1/cart`
    )
  }
}
