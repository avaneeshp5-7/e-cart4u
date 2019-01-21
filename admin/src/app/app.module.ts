import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {OrderModule } from "ngx-order-pipe";
import { NgDatepickerModule } from 'ng2-datepicker';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductComponent } from './product/product.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { BrandComponent } from "./brand/brand.component";
import { LoginComponent } from './login/login.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter'
import {NgxPaginationModule} from 'ngx-pagination';
import { ColorPickerModule } from 'ngx-color-picker';
import { SubSubCategoryComponent } from './sub-sub-category/sub-sub-category.component';
import { BusinessDetailsComponent } from './business-details/business-details.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { DatewiseComponent } from './datewise/datewise.component';
import { MonthwiseComponent } from './monthwise/monthwise.component';
import { YearwiseComponent } from './yearwise/yearwise.component';
import { DeliverystatusComponent } from './deliverystatus/deliverystatus.component';
import { AdminlogComponent } from './adminlog/adminlog.component';
import { DetailsComponent } from './details/details.component';
import { RoutGaurdService } from './routgaurd.service';

var rob=[
   {path:"",component:AdminlogComponent},
   {path:"details",component:DetailsComponent,
   canActivate:[RoutGaurdService],
    children: [ 
   {path:"cat",component:CategoryComponent},
   {path:"scat",component:SubCategoryComponent},
   {path:"subScat",component:SubSubCategoryComponent},
   {path:"brad",component:BrandComponent},
   {path:"prod",component:ProductComponent},
   {path:"datewise",component:DatewiseComponent},
   {path:"bdetails",component:BusinessDetailsComponent},
   {path:"month",component:MonthwiseComponent},
   {path:"year",component:YearwiseComponent},
   {path:"delstatus",component:DeliverystatusComponent}
 ]
}
]
var robj=RouterModule.forRoot(rob)
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    SubCategoryComponent, 
    ProductComponent,
    BrandComponent,
    LoginComponent,
    SubSubCategoryComponent,
    BusinessDetailsComponent,
    ProductSliderComponent,
    DatewiseComponent,
    MonthwiseComponent,
    YearwiseComponent,
    DeliverystatusComponent,
    AdminlogComponent,
    DetailsComponent
  ],
  imports: [
    NgDatepickerModule,OrderModule,BrowserModule,robj,FormsModule,HttpModule,Ng2SearchPipeModule,NgxPaginationModule,ColorPickerModule
  ],
  bootstrap: [AppComponent],
  providers:[RoutGaurdService]
})
export class AppModule {}
