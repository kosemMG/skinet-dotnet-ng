import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public product: Product;

  constructor(private shopService: ShopService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct(): void {
    const productId = +this.route.snapshot.paramMap.get('id');
    this.shopService.getProduct(productId).subscribe(product => this.product = product);
  }
}
