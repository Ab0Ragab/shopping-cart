import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Product[] = [];
  count: number = 0;
  tPrice: number = 0;
  constructor(
    private http: HttpClient
  ) {}

  addToCart(product: Product) {
    this.items.push(product);
    this.count = this.count + 1;
    this.tPrice = this.tPrice + product.price;
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.count = 0;
    this.tPrice = 0;
    return this.items;
  }

  increaseItem(i: number){
    this.items[i].quantity = this.items[i].quantity + 1;
    this.count = this.count + 1;
  }

  decreaseItem(i: number){
    this.items[i].quantity = this.items[i].quantity - 1;
    this.count = this.count - 1;
  }

  removeItem(i: number){
    this.count = this.count - this.items[i].quantity;
    this.items.splice(i,1);
  }

  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }
}
