import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [
    {
      id: 1,
      name: 'Samsung',
      description: 'very smart phone and very fast | 64 GB | 6 RAM | 4000mA.',
      price: 200,
      quantity: 1,
      img: 'https://static-delta.s3.amazonaws.com/mobileshop/media/66b7c9eb-68c9-4c4d-a87c-d891c38911fb.jpg'
    },
    {
      id: 2,
      name: 'Apple',
      description: 'very smart phone and very fast | 164 GB | 4 RAM | 3200mA.',
      price: 900,
      quantity: 1,
      img: 'http://images.sg.content-cdn.io/cdn//in-resources/0211f4bd-ce6a-4162-95a2-f801e5ae9176/Images/ProductImages/Source/iphone-xs-gold-1.jpg'
    },
    {
      id: 3,
      name: 'Sony',
      description: 'very smart phone and very fast | 8 GB | 2 RAM | 3800mA.',
      price: 400,
      quantity: 1,
      img: 'https://api.sonymobile.com/files/01_Xperia-L3_Primary-product-image_Silver-516515ceb04b881c70c8c740ac601e6a.png'
    },
    {
      id: 4,
      name: 'Huawei',
      description: 'very smart phone and very fast | 128 GB | 8 RAM | 4000mA.',
      price: 600,
      quantity: 1,
      img: 'https://sg-test-11.slatic.net/p/5f1a74bd29111dadf5734a529d82ffe6.jpg'
    },
    {
      id: 5,
      name: 'Honor',
      description: 'very smart phone and very fast | 32 GB | 8 RAM | 3200mA.',
      price: 250,
      quantity: 1,
      img: 'https://www.hihonor.com/content/dam/honor/in/blog/2018/price-list-honor-mobiles-under-10000-in-india/news-img1-price-list-honor-mobiles-under-10000-in-india-20180925.png'
    },
    {
      id: 6,
      name: 'HTC',
      description: 'very smart phone and very fast | 16 GB | 3 RAM | 4000mA.',
      price: 350,
      quantity: 1,
      img: 'https://www.91-img.com/pictures/134592-v3-htc-u19e-mobile-phone-large-1.jpg'
    }
  ];

  constructor() { 
  }

  public getProduct(id: number) {
    return this.products.find(p => p.id == id);
}
}
