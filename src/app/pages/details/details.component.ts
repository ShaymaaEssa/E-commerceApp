import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-details',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toasterAlert = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  
  wishlistItems:Signal<string[]> = computed(()=> this.wishlistService.wishListItems());
  

  detailsProduct : IProduct = {} as IProduct;


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:4000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        let productId = p.get('productId');

        //call api to get product detail
        this.productsService.getSpecificProduct(productId!).subscribe({
          next:(res)=>{
            this.detailsProduct = res.data;
          }, 
          error:(err)=>{
            console.log(err);
          }
        })

      }
    })

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

  addCartItem(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          this.toasterAlert.success(res.message, 'FreshCart');
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
}
