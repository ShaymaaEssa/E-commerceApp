import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet,  CarouselModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],  // Ensure buttons are visible
    autoplay: true,  // ✅ Enable autoplay
    autoplayTimeout: 3000, // ✅ Time between slides (in milliseconds)
    autoplayHoverPause: true, // ✅ Pause on hover
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
    nav: false
  }



}
