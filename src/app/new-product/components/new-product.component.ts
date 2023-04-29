import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { NewProductService } from '../services/new-product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../present-products/model/product.model';
import {eProductType} from '../../shared/enums/eProductType';
import fieldsToType from '../fields-to-type';
import { ProductService } from '../../present-products/services/products.service';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.less'],
  providers: [ProductService]
})
export class NewProductComponent implements OnInit {
  coordinates: any = {
    'תל אביב': {long: 34.781769, lat: 32.085300},
    'נתניה': {long: 34.856541, lat: 32.329369},
    'חיפה': {long: 34.988762, lat: 32.817280},
    'ירושלים': {long: 35.040161, lat: 31.728371},
    'קרית אונו': {long: 34.849522, lat: 32.058731},
    'באר שבע': {long: 34.793991, lat: 31.243870},
    'אילת': {long:34.94821, lat:29.55805},
    'פתח תקווה': {long:34.88747, lat:32.08707},
    'שוהם': {long:34.9542121245171, lat:31.9977784 },
    'דימונה': {long:35.033363, lat:31.069420 },
    'גני תקוה': {long:34.871329848, lat:32.05666644 },
    
  };
  public newProduct = this.formBuilder.group({
    name: '',
    category: '',
    area: '',
    city: '',
    price_from: '',
    price_to: '',
    max_number_of_buyers: '',
    description: '',
    tagsControl: '',
    hourlyPayment: '',
    dailyPayment: '',
    long:0,
    lat:0,
    users: [localStorage.getItem("user_email")]
  });

  type: eProductType = eProductType.rent;
  title: string = '';
  visible = true;
  selectable = true;
  removable = true;
  tags: string[] = [];
  ImageBaseData: string[] = [];
  calcHourlyPrice: string = '';
  calcDailyPrice: string = '';
  isLoggedIn = localStorage.getItem("user_email");

  // @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private newProductService: NewProductService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['type']) {
        this.type = params['type'];
      }
      else {
        this.type = eProductType.collaborativePurchase;
      }
    });

    if (this.type == eProductType.collaborativePurchase) {
      this.title = 'קנייה שיתופית'
    } else if(this.type == eProductType.rent) {
      this.title = 'השכרה';
    }
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
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onSubmit(): void {
    if(!localStorage.getItem("user_email")) {
      Swal.fire({
        title: 'ממש עוד מעט תוכל לשמור מוצר חדש- אבל לפני צריך להתחבר',
        showCancelButton: true,
        confirmButtonText: `התחבר`,
        cancelButtonText: `לא עכשיו`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      })
    }
    else {
      let newProduct: Product = this.newProduct.value as Product;
      newProduct.tags = this.tags;
      newProduct.productType = this.type;
      newProduct.photos = this.ImageBaseData;
      const coord = this.coordinates[newProduct.city];
      newProduct.long = coord.long;
      newProduct.lat = coord.lat;
      //  newProduct.users.push(localStorage.getItem("user_email"));

      this.newProductService.insertProduct(newProduct).subscribe(x => {
          Swal.fire(
            'השמירה בוצעה בהצלחה!',
            '',
            'success'
          ).then(x => {
            this.router.navigate(['/products-view/'], {queryParams: {type: this.type}})
          })
        },
        err => {
          Swal.fire(
            'יש לנו בעיה!',
            'המוצר לא נשמר, אנא פנה לתמיכה טכנית',
            'error'
          )
        });
    }
  }

  showField(fieldName: string) {
    return fieldsToType[fieldName].includes(this.type);
  }

  addFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const me = this;
    reader.readAsDataURL(file);
    reader.onload = function () {
      reader.result ? me.ImageBaseData.push(reader.result.toString()) : '';
    };
  }

  async calcPayment() {
    const price: any = await this.productService.getAvragePrice(this.newProduct.controls.name.value).toPromise();
    this.calcHourlyPrice = (price.avrage / 250).toFixed(2);
    this.calcDailyPrice = (price.avrage / 20).toFixed(2);
  }

  useHourlyPrice() {
    this.newProduct.controls.hourlyPayment.setValue(this.calcHourlyPrice);
  }

  useDailyPrice() {
    this.newProduct.controls.dailyPayment.setValue(this.calcDailyPrice);
  }
}
