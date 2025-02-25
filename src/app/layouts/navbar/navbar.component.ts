import { AuthService } from './../../core/services/auth/auth.service';
import { Component, Input, input, inject, DoCheck, OnInit, computed, signal, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {


  private readonly myTranslateService = inject(MyTranslateService);
  private readonly  cartService= inject(CartService);
  private readonly authService = inject(AuthService);

  isLogin = input<boolean>(true);
  cartCount:Signal<number> = computed(()=> this.cartService.numCartItem());


  private initialized = false; // Prevent multiple initializations

  ngOnInit(): void {
    this.cartService.getLoggeddUserCart().subscribe({
      next:(res)=>{
        this.cartService.numCartItem.set(res.numOfCartItems) ;
      }
    });
    
    console.log(`navbar cart item = ${this.cartCount}`);
  }
  
  ngAfterViewChecked() {
    if (!this.initialized) {
      this.initialized = true;
      setTimeout(() => {
        initFlowbite();
      }, 0);
    }
  }
  
  logOut(){
    this.authService.logOut();
  }

  changeLang(lang:string){
    this.myTranslateService.changeLangTranslate(lang);
  }
}
