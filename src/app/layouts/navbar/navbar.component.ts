import { AuthService } from './../../core/services/auth/auth.service';
import { Component, Input, input, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isLogin = input<boolean>(true);
  private readonly authService = inject(AuthService);

  logOut(){
    this.authService.logOut();
  }
}
