import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishListItems : WritableSignal<string[]> = signal([]);
  wishlistCount: WritableSignal<number> = signal(0);

  constructor(private httpClient : HttpClient) { }

  addProductWishList(productId:string):Observable<any>{
    console.log(productId);

    return this.httpClient.post(`${environment.baseURL}/api/v1/wishlist`, {
      
         "productId": productId
      
    })
  }

  removeProductWishList(productId:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseURL}/api/v1/wishlist/${productId}`);
  }

  getWishList():Observable<any>{
    return this.httpClient.get(`${environment.baseURL}/api/v1/wishlist`);
  }
}
