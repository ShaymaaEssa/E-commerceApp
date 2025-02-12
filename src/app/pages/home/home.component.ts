import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private readonly productsService=inject(ProductsService);
  

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProductsData();
  }

  getProductsData(){
    this.productsService.getAllProducts().subscribe({
      next:(res) =>{
        console.log('here');
        console.log(res.data);
      },
      error:(err)=>{
        console.log(err.message)
      }
    });
  }
}
