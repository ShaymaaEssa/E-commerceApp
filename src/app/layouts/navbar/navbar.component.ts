import { AuthService } from './../../core/services/auth/auth.service';
import {
  Component,
  Input,
  input,
  inject,
  DoCheck,
  OnInit,
  computed,
  signal,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly myTranslateService = inject(MyTranslateService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly authService = inject(AuthService);

  isLogin = input<boolean>(true);
  cartCount: Signal<number> = computed(() => this.cartService.numCartItem());
  wishlistCount: Signal<number> = computed(() =>
    this.wishlistService.wishlistCount()
  );

  private initialized = false; // Prevent multiple initializations
  userName: string | null = '';

  ngOnInit(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.cartService.getLoggeddUserCart().subscribe({
        next: (res) => {
          this.cartService.numCartItem.set(res.numOfCartItems);
        },
      });

      console.log(`navbar cart item = ${this.cartCount}`);

      this.userName = this.getUserName();
    }
  }

  ngAfterViewChecked() {
    if (!this.initialized) {
      this.initialized = true;
      setTimeout(() => {
        initFlowbite();
      }, 0);
    }
  }

  logOut() {
    this.authService.logOut();
  }

  changeLang(lang: string) {
    this.myTranslateService.changeLangTranslate(lang);
  }

  getUserName(): string | null {
    const token = localStorage.getItem('userToken');
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      console.log(`user name = ${decodedToken}`)
      return decodedToken.name || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
