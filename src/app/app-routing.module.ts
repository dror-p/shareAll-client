import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
// import { MyProductsPageComponent } from './personal-erea/my-products-page/my-products-page.component';
// import { MyProfilePageComponent } from './personal-erea/my-profile-page/my-profile-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { NewProductComponent } from './new-product/components/new-product.component';
import { ProductsViewComponent } from './present-products/components/products-view/products-view.component';
import {LoginComponent} from './login/login.component';
import {SigninComponent} from './signin/signin.component'
import {PersonalAreaComponent} from './personal-area/personal-area.component'
import { RenterRatingComponent } from './personal-erea/renterRate/components/renter-rating/renter-rating.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,

  },
  // {
  //   path: 'myproducts',
  //   component: MyProductsPageComponent,
  // },
  // {
  //   path: 'myprofile',
  //   component: MyProfilePageComponent,
  // },
  {
    path: 'new-product',
    component: NewProductComponent
  },
  {
    path: 'products-view',
    component: ProductsViewComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  { path: 'personal-area',
  component: PersonalAreaComponent
  },
  {
    path: 'rateTest',
    component: RenterRatingComponent
  },
  { path: '',  
   redirectTo: '/home', pathMatch: 'full' 
  },
  { path: '**',
   component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        //preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
