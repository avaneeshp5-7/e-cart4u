import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {HttpModule} from "@angular/http"
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { ProducttemplateComponent } from './producttemplate/producttemplate.component'
import {RouterModule} from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import { ImageSlideComponent } from './image-slide/image-slide.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NewArivalComponent } from './new-arival/new-arival.component';
import { AdsComponent } from './ads/ads.component';
import { ButtonsDirective } from './buttons.directive';
import { ButtonDirectiveDirective } from './button-directive.directive';
import { ProductDtailComponent } from './product-dtail/product-dtail.component';
import { FirstPageComponent } from './first-page/first-page.component'
import {ImageZoomModule} from 'angular2-image-zoom';
import { SliderModule } from 'ngx-slider';
import {RatingModule} from "ngx-rating";

import{ShowCartImageServiceService} from "./show-cart-image-service.service";
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UpcommingComponent } from './upcomming/upcomming.component';
import { ShowCartDetailsComponent } from './show-cart-details/show-cart-details.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { PurchagedetailsComponent } from './purchagedetails/purchagedetails.component';
import { ShoppinghistryComponent } from './shoppinghistry/shoppinghistry.component';
import { MoblileComponent } from './moblile/moblile.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { OtpComponent } from './otp/otp.component';
import { NewpassordComponent } from './newpassord/newpassord.component'

var robj=[
 
 
{path:"",component:FirstPageComponent}, 
	{path:"profile",component:UserprofileComponent},

	        {path:"upcon",component:UpcommingComponent},
          {path:"protemp",component:ProducttemplateComponent},
          {path:"prodetail",component:ProductDtailComponent},
          {path:"cartdet",component:ShowCartDetailsComponent},
          {path:"shopp",component:ShoppinghistryComponent},
          {path:"p_details",component:PurchagedetailsComponent},
          {path:"mobil",component:MoblileComponent},
          {path:"otp_enter",component:OtpComponent},
          {path:"gen_new_pass",component:NewpassordComponent}
]
var router=RouterModule.forRoot(robj)

@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    ProducttemplateComponent,
    FooterComponent,
    ImageSlideComponent,
    NewProductComponent,
    NewArivalComponent,
    AdsComponent,
    ButtonsDirective,
    ButtonDirectiveDirective,
    ProductDtailComponent,
    FirstPageComponent,
    UserprofileComponent,
    UpcommingComponent,
    ShowCartDetailsComponent,
    ProductSliderComponent,
    PurchagedetailsComponent,
    ShoppinghistryComponent,
    MoblileComponent,
    HeaderMenuComponent,
    OtpComponent,
    NewpassordComponent
  ],


  imports: [
    BrowserModule,BrowserAnimationsModule,HttpModule,FormsModule,router,ImageZoomModule,SliderModule,RatingModule
  ],
  providers: [ShowCartImageServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
