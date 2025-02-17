import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  private readonly cartService = inject(CartService);

  cartDetails:ICart = {} as ICart;


  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(){
    this.cartService.getLoggeddUserCart().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.cartDetails = res.data;
      }, 
      error:(err)=>{
        console.log(err);
      }
    })
  }

  removeItem (id:string){
    this.cartService.removeCartItem(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status ==='success'){
          alert("Product Removed Successfully!")
          this.cartDetails = res.data;
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  updateCartQuantity(id:string, count:number){
    this.cartService.updateProductQuantity(id, count).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
