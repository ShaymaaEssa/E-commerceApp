import { isPlatformBrowser } from '@angular/common';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'E-CommerceApp';
  private initialized = false; // Prevent multiple initializations


  constructor(private FlowbiteService: FlowbiteService, @Inject(PLATFORM_ID) private platformId: object) {}

  // ngOnInit(): void {
  //   this.FlowbiteService.loadFlowbite(flowbite => {
  //     // Your custom code here
  //     console.log('Flowbite loaded', flowbite);
  //   });
  // }

  ngAfterViewChecked() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.initialized) {
        this.initialized = true;
        setTimeout(() => {
          initFlowbite();
        }, 0);
      }
    }
      
    }


}
