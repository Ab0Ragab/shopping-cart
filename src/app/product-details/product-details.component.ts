import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../shared/products.service';
import { CartService } from '../shared/cart.service';
import { Product } from '../shared/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  selectedProduct: Product;
  selectedId: number;
  addProduct = false;
  constructor(private route: ActivatedRoute,
              private productService: ProductsService,
              private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = +params.get('productId');
    });

    this.selectedProduct = this.productService.getProduct(this.selectedId);
  }

  addToCart(product: Product) {
    //window.alert('Your product has been added to the cart!');
    this.addProduct = !this.addProduct;
    this.cartService.addToCart(product);
  }

}
