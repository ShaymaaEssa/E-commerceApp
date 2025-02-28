import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe, isPlatformBrowser, SlicePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TermtextPipe } from '../../shared/pipes/termtext.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

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
  
  products :WritableSignal <IProduct[]> = signal ([]);
  searchText:string="";

  ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      if(isPlatformBrowser(this.ID)){
        this.getProductsData();
      }
      
    }

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
}
