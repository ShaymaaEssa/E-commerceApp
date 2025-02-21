import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  private readonly cartService = inject(CartService);

  cartDetails:ICart = {} as ICart;
  isLoading:boolean =  false;


  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(){
    this.isLoading = true;
    this.cartService.getLoggeddUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.isLoading = false;
        this.cartDetails = res.data;
      }, 
      error:(err)=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  removeItem (id:string){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove item!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeCartItem(id).subscribe({
          next:(res)=>{
            console.log(res);
            if(res.status ==='success'){
              this.cartDetails = res.data;
              console.log(`cart details: ${this.cartDetails._id}`)
              Swal.fire({
                title: "Deleted!",
                text: "Your item is deleted.",
                icon: "success"
              });
            }
          },
          error:(err)=>{
            console.log(err)
          }
        })
        
      }
    });

    
  }

  updateCartQuantity(id:string, count:number){
    if(count === 0){
      this.removeItem(id);
      console.log(`cart details: ${this.cartDetails._id}`)
    } else {
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

  clearCart(){

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear cart!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearUserCart().subscribe({
          next:(res)=>{
            console.log(res);
            if(res.message ==='success'){
              this.cartDetails = {} as ICart;
              Swal.fire({
                title: "Deleted!",
                text: "Your cart is cleared.",
                icon: "success"
              });
            }
          }, 
          error:(err)=>{
            console.log(err);
          }
        })
        
      }
    });
    
    
  }

}
