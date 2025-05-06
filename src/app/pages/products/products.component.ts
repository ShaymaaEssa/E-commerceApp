import { Component, computed, inject, OnInit, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe, isPlatformBrowser, SlicePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TermtextPipe } from '../../shared/pipes/termtext.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Subject } from 'rxjs';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-products',
  imports: [RouterLink, TitleCasePipe, SlicePipe, CurrencyPipe, TermtextPipe, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productsService=inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toasterAlert = inject(ToastrService);
  private readonly ID = inject( PLATFORM_ID) ;  
  private readonly wishlistService = inject(WishlistService);
  
  private readonly destroy$ = new Subject<void>(); // Subject to track unsubscription
  
  
  products :WritableSignal <IProduct[]> = signal ([]);
  wishlistItems:Signal<string[]> = computed(()=> this.wishlistService.wishListItems());
  
  searchText:string="";

  ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      if(isPlatformBrowser(this.ID)){
        this.getProductsData();
        this.wishlistService.getWishList().subscribe({
          next:(res)=>{
            console.log(res);
            if(res.status === 'success'){
              this.wishlistService.wishListItems.set(res.data.map((item: { _id: string }) => item._id));
              this.wishlistService.wishlistCount.set(this.wishlistService.wishListItems().length);
            }
          }
        })
      }
      
    }

    // ngAfterViewChecked(): void {
    //   //Called after every check of the component's view. Applies to components only.
    //   //Add 'implements AfterViewChecked' to the class.
    //   if (typeof initFlowbite === 'function') {
    //   initFlowbite(); // Re-initialize Flowbite
    //   }
    // }

    getProductsData(){
      this.productsService.getAllProducts().subscribe({
        next:(res) =>{
          console.log('here');
          console.log(res.data);
          this.products.set(res.data);
        },
        error:(err)=>{
          console.log(err.message)
        }
      });
    }

    addCartItem(id:string):void{
      this.cartService.addProductToCart(id).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status === 'success'){
            this.toasterAlert.success(res.message, 'FreshCart');
            this.cartService.numCartItem.set(res.numOfCartItems) ;
            console.log(`home cart item = ${res.numOfCartItems}`);
          }
  
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }

    addProductWishList(productId:string){
      this.wishlistService.addProductWishList(productId).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status ==="success"){
            this.toasterAlert.success(res.message, 'FreshCart');
            this.wishlistService.wishListItems.set(res.data);
            this.wishlistService.wishlistCount.set(this.wishlistService.wishListItems().length);
  
          }
        }
      })
    }
  
    removeProductWishList(productId:string){
      this.wishlistService.removeProductWishList(productId).subscribe({
        next:(res)=>{
          console.log(res);
          this.toasterAlert.success(res.message, 'FreshCart');
          this.wishlistService.wishListItems.set(res.data);
          this.wishlistService.wishlistCount.set(this.wishlistService.wishListItems().length);
  
        }
      })
    }

    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.destroy$.next(); // Notify all subscriptions to unsubscribe
      this.destroy$.complete(); // Complete the subject
    }
}
