import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, JsonPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly wishlistService = inject(WishlistService); 
  private readonly cartService = inject(CartService);
  private readonly toasterAlert = inject(ToastrService);
  

  wishListItems: WritableSignal<IProduct[]> =  signal ([])
  ngOnInit(): void {
    this.getWishListData();
  }

  getWishListData(){

    this.wishlistService.getWishList().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.wishListItems.set( res.data);
      }, 
      error:(err)=>{
        console.log(err);
      }
    })
  }


  addItemToCart(id:string){

    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        if(res.status === 'success'){
          this.toasterAlert.success(res.message, 'FreshCart');
          this.cartService.numCartItem.set(res.numOfCartItems) ;
          console.log(`home cart item = ${res.numOfCartItems}`);
      }
    }
    });

    this.removeItemWishList(id);
  }

  removeItemWishList(id:string){
    this.wishlistService.removeProductWishList(id).subscribe({
      next:(res)=>{
        this.toasterAlert.success(res.message, 'FreshCart');
        this.wishlistService.wishListItems.set(res.data);
        this.wishlistService.wishlistCount.set(this.wishlistService.wishListItems().length);
        this.getWishListData();
      }
    });
  }
}
