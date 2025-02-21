import { CategoriesService } from './../../core/services/categories/categories.service';
import { CurrencyPipe, isPlatformBrowser, SlicePipe, TitleCasePipe } from '@angular/common';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { TermtextPipe } from '../../shared/pipes/termtext.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, TitleCasePipe, SlicePipe, CurrencyPipe, TermtextPipe, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private readonly productsService=inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toasterAlert = inject(ToastrService);
  

  private readonly ID = inject( PLATFORM_ID) ;
  
  products :IProduct[] = [];
  categories:ICategory[] = [];

  searchText:string="";

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(isPlatformBrowser(this.ID)){
      this.getProductsData();
      this.getCategoryData();
    }
    
  }

  getProductsData(){
    this.productsService.getAllProducts().subscribe({
      next:(res) =>{
        console.log('here');
        console.log(res.data);
        this.products = res.data;

        
      },
      error:(err)=>{
        console.log(err.message)
      }
    });
  }

  getCategoryData(){
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categories = res.data;
      },
      error:(err)=>{
        console.log(err);
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
}
