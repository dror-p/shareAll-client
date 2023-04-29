import { Component } from '@angular/core';
import {eProductType} from './shared/enums/eProductType';

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";


interface SideNavRoute {
  icon?: string;
  route?: string;
  title?: string;
  type?: eProductType;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  loggedIn: Boolean = this.CheckIfLoggedin();

  CheckIfLoggedin(){
    if(localStorage.getItem("id_token")){
      return true;
    }else{
      return false
    }
  }
  

  constructor(private matIconRegistry: MatIconRegistry ,private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      `facebook`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/icons8-facebook.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `google`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/icons8-google.svg")
    );
  }
  title = 'shareAll';
  public myWorkRoutes: SideNavRoute[] = [
    {icon: 'supervisor_account', route: '/admin',title: 'מנהל מערכת'},
    {icon: 'feedback', route: '/contact', title: 'צור איתנו קשר'},
    {icon: 'contact_support', route: '/about', title: 'עלינו'}
  ];
  public myereaRoutes: SideNavRoute[] = [
    {icon: 'shopping_cart', route: '/myproducts',title: 'המוצרים שלי'},
    {icon: 'account_box', route: '/myprofile', title: 'הפרופיל שלי'}
  ];
  public productsereaRoutes: SideNavRoute[] = [
    {icon: 'shopping_basket', route: '/products-view', type: eProductType.collaborativePurchase ,title: 'מוצרים לקנייה שיתופית'},
    {icon: 'shop', route: '/products-view', type: eProductType.rent, title: 'מוצרים להשכרה'}
    // {icon: 'add_to_queue', route: '/new-collaborative-purchase-product', title: 'product advertising'}
  ];

}
