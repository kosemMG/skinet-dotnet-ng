import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';
import { Pagination } from '../shared/models/pagination';
import { ProductBrand } from '../shared/models/product-brand';
import { ProductType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shop-params';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true }) search: ElementRef<HTMLInputElement>;

  public products: Product[];
  public brands: ProductBrand[];
  public types: ProductType[];
  public shopParams = new ShopParams();
  public totalCount: number;

  public sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];

  constructor(private shopService: ShopService) { }

  public ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  public getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: ({ data, pageIndex, pageSize, count }: Pagination) => {
        this.products = data;
        this.shopParams.pageIndex = pageIndex;
        this.shopParams.pageSize = pageSize;
        this.totalCount = count;
      },
      error: error => console.log(error)
    });
  }

  public getBrands(): void {
    this.shopService.getBrands().subscribe({
      next: (brands: ProductBrand[]) => this.brands = [{ id: 0, name: 'All' }, ...brands],
      error: error => console.log(error)
    });
  }

  public getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (types: ProductType[]) => this.types = [{ id: 0, name: 'All' }, ...types],
      error: error => console.log(error)
    });
  }

  public onBrandIdSelected(brandId: number): void {
    this.shopParams.brandId = brandId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  public onTypeIdSelected(typeId: number): void {
    this.shopParams.typeId = typeId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  public onSortSelected(event: Event): void {
    this.shopParams.sort = (event.target as HTMLSelectElement).value;
    this.getProducts();
  }

  public onPageChanged(page: number): void {
    if (this.shopParams.pageIndex === page) return;
    this.shopParams.pageIndex = page;
    this.getProducts();
  }

  public onSearch(): void {
    this.shopParams.search = this.search.nativeElement.value;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  public onReset(): void {
    this.search.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
