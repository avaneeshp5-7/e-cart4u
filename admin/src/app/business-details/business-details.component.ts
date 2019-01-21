import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import $ from "jquery"
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
//import {DatepickerModule} from '../../../node_modules/ngx-date-picker';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {

  constructor( public hobj:Http) { }
busdata;f_option:DatepickerOptions;
l_option:DatepickerOptions;
  ngOnInit() {
     // ===== From Date ======//
      this.f_option={
        // dateFormat: 'M yy',
         displayFormat: 'DD-MM-YYYY',
         placeholder: 'DD-MM-YYYY',
      }
     // ===== To Date ======//
    this.l_option={
    displayFormat: 'DD-MM-YYYY',
    placeholder: 'DD-MM-YYYY'
    }
  //   this.hobj.get("bus/busDetails").subscribe(dt=>{
  //   this.busdata=JSON.parse(dt['_body'])
  //  alert(this.busdata)
  //   });
  }  
  fdate;tdate;ddata
  fun_date_wise(){
    var dtarr=[{date_order:this.fdate},{date_order:this.tdate}]
    console.log(dtarr)
    this.hobj.post("/bus/datawise",dtarr).subscribe(this.bcbk1)
  }
  bcbk1=(dt)=>{
    console.log(dt._body)
  }
}
