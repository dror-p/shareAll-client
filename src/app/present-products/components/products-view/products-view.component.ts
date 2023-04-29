import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Product } from '../../model/product.model'

import { ProductService } from '../../services/products.service';
import {Observable, of} from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {eProductType} from 'src/app/shared/enums/eProductType';
import { RentRequestDialogComponent } from '../rent-request-dialog/rent-request-dialog.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.less'],
  providers: [ProductService],
})
export class ProductsViewComponent implements OnInit{
  // allProducts: Product[];
  newAllProducts: Product[] = [];
  type: eProductType = eProductType.rent;
  typeTitle: string = "";
  title: string = "";
  filteredProducts: any;
  description: string = "";
  category: string[] = [];
  area: string[] = [];
  city: string[] = [];
  tags: string[] = [];
  user: any;
  recommendedProduct: any = null;
  async ngOnInit() {

    function distance(lon1: any, lat1: any, lon2: any, lat2: any) {
      var R = 6371; // Radius of the earth in km
      var dLat = toRad(lat2 - lat1);
      var dLon = toRad(lon2 - lon1);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    }

    function toRad(coord: any) {
      return coord * Math.PI / 180;
    }

    //get user long lat (location coordinates)
    window.navigator.geolocation.getCurrentPosition(async (pos) => {
      console.log(pos);
      //user position by browser
      var lat = pos.coords.latitude;
      var lon = pos.coords.longitude;

      this.route.queryParams.subscribe(params => {
        if (params['type']) {
          this.type = params['type'];
        }
      });

      if (this.type == eProductType.rent) {
        this.typeTitle = 'rent';
        this.title = 'השכרה';
      } else if (eProductType.collaborativePurchase) {
        this.typeTitle = 'buyGlobal';
        this.title = 'קנייה שיתופית';
      }

      this.productService.getAllProducts(this.typeTitle).subscribe(products => {
        products.forEach((p: any) => {
          p.distance = distance(lon, lat, p.long, p.lat);
        });

        this.newAllProducts = products;
        this.filteredProducts = this.newAllProducts;
      });
      if (localStorage.getItem('user')) {
        const user = localStorage.getItem('user');
        this.user = JSON.parse(user || '{}');
      }
    });

  }

  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private router: Router,
    public route: ActivatedRoute) {
  }

 async openDialog(product: Product) {
    await this.productService.addProductToHistory(this.user._id, product._id).toPromise();
    this.productService.getUserProductHistory(this.user._id).subscribe((products: any) => {
      let historyProductIds:any=[];
      const productsDictionary: any = {};
      products.forEach((p: any) => {
        if (productsDictionary[p.category]) {
          productsDictionary[p.category]++;
        } else {
          productsDictionary[p.category] = 1;
        }
        historyProductIds.push(p._id);
      });

      let mostWatchedCategory = 0;
      let mostWatchedCategoryName: any = '';

      for (let [key, value] of Object.entries(productsDictionary)) {
        if (productsDictionary[key] > mostWatchedCategory) {
          mostWatchedCategory = productsDictionary[key];
          mostWatchedCategoryName = key;
        }
      }

      const productsOfMostWatchCategory: any = [];
      this.filteredProducts.forEach((p: any) => {

        if (p.category == mostWatchedCategoryName) {
          productsOfMostWatchCategory.push(p);
        }
      });
      const productsOfMostWatchCategoryUnWAtched = productsOfMostWatchCategory.filter((p:any)=>{
        return historyProductIds.indexOf(p._id)==-1;
      })
      //  this.filteredProducts.filter((p: any) => p.category == mostWatchedCategoryName
      //   && productsOfMostWatchCategory.indexOf(p._id) == -1);
      if (productsOfMostWatchCategoryUnWAtched) {
        productsOfMostWatchCategoryUnWAtched.sort(this.compare);
        this.recommendedProduct = productsOfMostWatchCategoryUnWAtched[0];
      }
    });
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {product: product}
    });
  }
  compare(a: any, b: any) {
    if (a.watches < b.watches) {
      return 1;
    }
    if (a.watches > b.watches) {
      return -1;
    }
    return 0;
  }
  onSearchFilterChanged() {
    this.filteredProducts = this.newAllProducts.filter(product => {
      return (
        (!this.description || (this.description && (product.name.toString().includes(this.description) ||
          product.description.toString().includes(this.description) || product.tags.find(tag => tag.includes(this.description)))))
        && (this.area.length === 0 || (this.area && this.area.includes(product.area)))
        && (this.city.length === 0 || (this.city && this.city.includes(product.city)))
        && (this.category.length === 0 || (this.category && this.category.includes(product.category)))
        && (this.tags.length === 0 || (this.tags && product.tags.find(tag => this.tags.includes(tag))))
      );
    });
  }

  addTag(event: any) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.onSearchFilterChanged();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    this.onSearchFilterChanged();
  }

  openRentRequestDialog(product: any) {
    const dialogRef = this.dialog.open(RentRequestDialogComponent, {
      data: {product}
    });
  }

  joinGroup(product: any) {
    this.productService.joinGroup(product._id, this.user._id).subscribe((retProduct: any) => {
      product = retProduct.data;
      Swal.fire(
        'בקשתך להצטרף לקבוצה נוצרה בהצלחה!',
        '',
        'success'
      );
    });
  }
}
