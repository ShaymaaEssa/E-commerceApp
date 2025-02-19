import { OrdersService } from './../../core/services/orders/orders.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { IAllOrders } from '../../shared/interfaces/iall-orders';
import { allowedNodeEnvironmentFlags } from 'process';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  // private readonly authService = inject(AuthService);
  private readonly ordersService = inject(OrdersService);


  userId :string = '';
  allOrdersArr : IAllOrders[] = [];

  ngOnInit(): void {
    // this.getUserId();
    this.getUserOrders();
  }

  // getUserId (){
  //   this.userId =  this.authService.userData.id;
  // }

  getUserOrders(){
    console.log(`user id = ${this.userId}`);
    this.ordersService.getUsersOrders().subscribe({
      next:(res)=>{
        console.log(res);
        this.allOrdersArr = res;
      }, 
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
