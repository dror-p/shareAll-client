import { Component, OnInit } from '@angular/core';
import {PersonalAreaService} from './services/personal-area.service';
import {Product} from '../present-products/model/product.model';
import {eProductType} from '../shared/enums/eProductType';
import {loginservice} from '../login/service/login.service';
import {user} from '../user/user.model';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.less'],
  providers: [PersonalAreaService, loginservice]
})
export class PersonalAreaComponent implements OnInit {

  constructor(private personalAreaService: PersonalAreaService, private loginService: loginservice) { }

  userProductsForRent: Product[] = [];
  userProductsForGlobalBuy: Product[] = [];
  globalBuyRequests: Array<any> = new Array<any>();
  user: user = {email: '', renterRate: 0, password: ''};

  ngOnInit(): void {
    const userMail = localStorage.getItem('user_email');

    if(userMail) {
      this.personalAreaService.getAllUserProducts(userMail).subscribe(products => {
        if(products) {
          this.userProductsForRent = (products as Product[]).filter(product => product.productType == eProductType.rent);
          this.userProductsForGlobalBuy = (products as Product[]).filter(product => product.productType == eProductType.collaborativePurchase);

          this.userProductsForGlobalBuy.forEach(product => {
            product.pendings.forEach(userId => {
              this.loginService.getUserById(userId).subscribe(user => {
                this.globalBuyRequests.push({user: user, product: product});
              })
            });
          });
        }
        // this.personalAreaService.getAllRentRequets(userMail).subscribe(products => {
        //
        // })

        this.personalAreaService.getUser(userMail).subscribe(user => {
          this.user = user;
          this.personalAreaService.getRequestsForRent(user._id).subscribe(req => {
            debugger;
            this.userProductsForRent = req as Product[];
          });
        });
      });
    }
  }

  savePersonalInfo(): void {
    debugger;
    this.personalAreaService.savePersonalInfo(this.user);
  }

  addPartner(userid: string, productId: string) {
    debugger;
    this.personalAreaService.addPartner(userid, productId);

  }

}
