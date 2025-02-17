import { Component, OnInit, inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)

  detailsProduct : IProduct = {} as IProduct;


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
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
  }

  addCartItem(id:string){

  }
}
