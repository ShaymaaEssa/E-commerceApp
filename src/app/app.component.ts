import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { Component } from '@angular/core';
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


  constructor(private FlowbiteService: FlowbiteService) {}

  // ngOnInit(): void {
  //   this.FlowbiteService.loadFlowbite(flowbite => {
  //     // Your custom code here
  //     console.log('Flowbite loaded', flowbite);
  //   });
  // }

  ngAfterViewChecked() {
      if (!this.initialized) {
        this.initialized = true;
        setTimeout(() => {
          initFlowbite();
        }, 0);
      }
    }

}
