import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ProductsViewComponent } from './present-products/components/products-view/products-view.component';
import { ProductDialogComponent } from './present-products/components/product-dialog/product-dialog.component';
import { NewProductComponent } from './new-product/components/new-product.component';
import { LoginComponent } from './login/login.component';
import { RenterRatingComponent } from './personal-erea/renterRate/components/renter-rating/renter-rating.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { SigninComponent } from './signin/signin.component';
import { PersonalAreaComponent } from './personal-area/personal-area.component';
import { RentRequestDialogComponent } from './present-products/components/rent-request-dialog/rent-request-dialog.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProductService } from './present-products/services/products.service';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomePageComponent,
    AdminPageComponent,
    NewProductComponent,
    ProductDialogComponent,
    ProductsViewComponent,
    LoginComponent,
    SigninComponent,
    PersonalAreaComponent,
    RentRequestDialogComponent,
    RenterRatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '460419613912-h4ct00aln234hjmql3uk0oc1j6t5o04u.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('747257645972369')
        }
      ]
    } as SocialAuthServiceConfig,
  },
  ProductService
],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {}
}
