import { Component, Inject } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router"
@Component({
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  constructor(@Inject(Http) public bobj) {
    this.funGetbrand()
    this.funCateg()
  }
  ///=========================Add Brands Name===========================///
  msg1;
  msg2;
  msg3;
  mmsg4;
  scid: any = ""; chid = ""; bname; brec;
  funBrand(fr3) {
    if (fr3.valid) {
      var brd = { catid: this.chid, scatid: this.scid, Brand: this.bname,sscatid:this.sscid, "active": 1 }
      this.bobj.post("brand/brdrec", brd).subscribe(this.insback)
    }
    else {
      this.msg1 = " * Select Category ! !";
      this.msg2 = " * Select SubCategory ! !";
      this.mmsg4 = " * Select SubSubCategory ! !";
      this.msg3 = " * Enter Brand ! !";
    }
  }
  insback = (dt) => {
    alert(dt._body)
    this.funGetbrand()
      ; this.chid = "";
    this.scid = "";
    this.bname = ""
  }

  ///////////////////////////Get Category///////////////////
  catrec;
  funCateg() {
    this.bobj.get("category/getcato").subscribe(this.catback)
  }
  catback = (dt) => {
    this.catrec = JSON.parse(dt._body)
  }
  ///=========================Get Sub Cat Name=======================///
  subcatrec;
  funChange() {
    var crec = { catid: this.chid }
    this.bobj.post("brand/getrec", crec).subscribe(this.scatback)
  }
  scatback = (dt) => {

    this.subcatrec = JSON.parse(dt._body)
  }

//  ===========SubSubget ========================//
ssubrec;sscid=""
funSsub(){
  var brdobj={scatid:this.scid}
  this.bobj.post("brand/getssub",brdobj).subscribe(dt=>{
  this.ssubrec=JSON.parse(dt._body)
  })
}
  //=============================Get Brand Record============================//
  funGetbrand() {
    this.bobj.get("brand/brandrec").subscribe(this.brdcback)
  }
  brdcback = (dt) => {
    this.brec = JSON.parse(dt._body)
  }
  //=================Delete=======================================///
  funBdell(bnm) {
    var conf=confirm("Do You Want to Delete !")
    if(conf==true)
    {
    var brnm = { _id: bnm }
    this.bobj.post("brand/bdell", brnm).subscribe(this.brdelcback)
  }
}
  brdelcback = (dt) => {
    alert(dt._body)
    this.funGetbrand()
  }
  subcat="";ssubrecd;
  chSsub(){
    var brdobj={scatid:this.subcat}
  this.bobj.post("brand/getssub",brdobj).subscribe(dt=>{
  this.ssubrecd=JSON.parse(dt._body)
  })
  }
  //====================Update Brands============================/

  subcatrec1; cat
  cnFunn() {
    var crec = { catid: this.cat }
    this.bobj.post("brand/getrec", crec).subscribe(this.scatback1)
  }
  scatback1 = (dt) => {

    this.subcatrec1 = JSON.parse(dt._body)
  }

  subscat;
  bgloid = 0; bupdt;
  brandUpd(brobj) {
    this.bgloid = brobj._id
    this.bupdt = brobj.Brand
    this.cat = brobj.catid
    this.subcat = brobj.scatid
    this.subscat=brobj.sscatid  
    this.cnFunn();
    this.chSsub();
  }
  brdSave(fb) {
    if (fb.valid == false)
      alert("Fail !!")
    else {
      var oldbrd = { _id: this.bgloid }
      var newbrd = { catid: this.cat, scatid: this.subcat,sscatid:this.subscat, Brand: this.bupdt }
      var barr = [oldbrd, newbrd]
      this.bobj.post("brand/Updatebrd", barr).subscribe(this.upcback)
    }
  }
  upcback = (dt) => {
    alert(dt._body)
    this.funGetbrand()
    this.bgloid = 0
  }

  //==============================Sorting==============================//
  keyval = "cname"; bord = false
  brnsSort(bcolmn) {
    this.keyval = bcolmn
    this.bord = !this.bord
  }
}
