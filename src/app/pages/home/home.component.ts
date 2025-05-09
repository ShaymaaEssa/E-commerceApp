import { CategoriesService } from './../../core/services/categories/categories.service';
import { CurrencyPipe, isPlatformBrowser, SlicePipe, TitleCasePipe } from '@angular/common';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, computed, inject, PLATFORM_ID, Signal } from '@angular/core';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { TermtextPipe } from '../../shared/pipes/termtext.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Subject } from 'rxjs';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shared/interfaces/ibrand';



@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, TitleCasePipe, SlicePipe, CurrencyPipe, TermtextPipe, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private readonly productsService=inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly brandsService = inject(BrandsService);
  private readonly cartService = inject(CartService);
  private readonly toasterAlert = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  
  private readonly destroy$ = new Subject<void>(); // Subject to track unsubscription


  private readonly ID = inject( PLATFORM_ID) ;
  
  wishlistItems:Signal<string[]> = computed(()=> this.wishlistService.wishListItems());

  products :IProduct[] = [];
  categories:ICategory[] = [];
  brands:IBrand[] = [];

  searchText:string="";

  isRTL = document.documentElement.dir === 'rtl';

  activeImages:string[] = [];


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
    nav: false,
    rtl:this.isRTL
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
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
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true, 
    rtl:this.isRTL
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(isPlatformBrowser(this.ID)){
      this.getProductsData();
      this.getCategoryData();
      this.getBrandsData();
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

  getBrandsData(){
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.brands = res.data;
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

  setActiveCursolImage(index:number, image:string):void{
    this.activeImages[index] = image;
  }
}
