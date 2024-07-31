import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { AboutUsComponent } from './components/about-us/about-us.component'; 
import { ContactUsComponent } from './components/contact-us/contact-us.component'; 
import { HelpComponent } from './components/help/help.component'; 
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStateComponent } from './components/cart-state/cart-state.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStateComponent } from './components/login-state/login-state.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG 
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import appEnvConfig from './config/app-env-config';

const oktaConfig = appEnvConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent, data: { breadcrumb: 'Checkout' }},
  {path: 'cart-details', component: CartDetailsComponent, data: { breadcrumb: 'Cart Details' }},
  {path: 'products/:id', component: ProductDetailsComponent, data: { breadcrumb: 'Product Details' }},
  {path: 'search/:keyword', component: ProductListComponent, data: { breadcrumb: 'Search' }},
  {path: 'category/:id', component: ProductListComponent, data: { breadcrumb: 'Category' }},
  {path: 'category', component: ProductListComponent, data: { breadcrumb: 'Category' }},
  {path: 'products', component: ProductListComponent, data: { breadcrumb: 'Products' }},
  {path: 'about-us', component: AboutUsComponent, data: { breadcrumb: 'About Us' }},
  {path: 'contact-us', component: ContactUsComponent, data: { breadcrumb: 'Contact Us' }},
  {path: 'help', component: HelpComponent, data: { breadcrumb: 'Help' }},
  {path: '', redirectTo: '/products', pathMatch: 'full', data: { breadcrumb: 'Home' }},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    AboutUsComponent,
    ContactUsComponent,
    HelpComponent,
    ProductDetailsComponent,
    CartStateComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStateComponent,
    BreadcrumbComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: { oktaAuth }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
