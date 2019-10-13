import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Product } from '../shared/product';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
items: Product[];
totalPrice: number;
  constructor( public cartService: CartService) {
    this.items = this.cartService.getItems();
    this.totalPrice = this.cartService.tPrice;
  }
  

onDelete(i: number)
{
  let totalItemPrice = this.items[i].price * this.items[i].quantity;
  this.totalPrice = this.totalPrice - totalItemPrice;
  this.cartService.removeItem(i);
}

onIncrease(i: number){
    this.cartService.increaseItem(i);
    this.totalPrice = this.totalPrice + this.items[i].price;
}

ondecrease(i: number){
  if(this.items[i].quantity === 1){
    this.onDelete(i);
  } else {
    this.cartService.decreaseItem(i);
    this.totalPrice = this.totalPrice - this.items[i].price;
  }
}

}
