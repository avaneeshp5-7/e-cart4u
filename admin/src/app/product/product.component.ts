import { Component, Inject, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router"
import { Subscriber } from 'rxjs';
import { ActivatedRoute } from "@angular/router"
@Component({

  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']

})
export class ProductComponent {

  constructor(@Inject(Http) public pobj, public arr: ActivatedRoute, @Inject(Router) public rot) {
    this.funCat();
    this.fungetPro();
  }
  ngOnInit() {
    var imgname = ""
    this.arr.params.subscribe	(dd => {
      if (dd['iname']) {
        imgname = dd['iname']
        // alert(imgname)
        var iobj = { images: imgname }
        this.pobj.post("poduct/iobj", iobj).subscribe(imgdataFu => {

        })
      }

    })
  }
  //====================Add Product======================//
  msg1: String = "";
  msg2: String = "";
  msg3: String = "";
  msg4: String = "";
  msg5: String = "";
  msg6: String = "";
  msg7: String = "";
  nm: String = "";

  pcatrec; msg9; pscatrec; pbrandrec; t1: any = ""; t2: any = ""; t3 = ""; ssub = ""; t4; t5; t6; t7; upco="";quantity;rat;
  funAddProd(fr4) {
    if (fr4.valid) {
      var product = { catid: this.t1, scatid: this.t2, sscatid: this.ssub, bdid: this.t3, pname: this.t4, pprice: this.t5, pcolor: this.t6, upcoming: this.upco, pdesc: this.t7,quant:this.quantity,rating:this.rat }
      this.pobj.post("poduct/proRec", product).subscribe(this.prcback)
    }
    else {
      this.msg1 = " * Enter Product Name"
      this.msg2 = " * Enter Product Price"
      this.msg3 = " * Enter Product Color"
      this.msg4 = " * Enter Description"
      this.msg5 = " * Select Category"
      this.msg6 = " * Select Subcategory"
      this.msg9 = " * Select Sub Subcategory"
      this.msg7 = " * Select Brand"
      this.nm = " * Select Type "
    }
  }
  prcback = (dt) => {
    this.fungetPro()
    // this.t1 = "";
    // this.t2 = "";
    // this.t3 = "";
    // this.t4 = "";
    this.t5 = "";
    this.t6 = "";
    this.t7 = "";
    var files = <HTMLFormElement>document.getElementById("frm")
    files.submit()
  }
  ////////////////Category//////////////
  pcatrec1
  funCat() {
    this.pobj.get("poduct/catRec").subscribe(this.catback)
  }
  catback = (dt) => {
    this.pcatrec = JSON.parse(dt._body)
    //this.pcatrec1=JSON.parse(dt._body)
  }
  ////////////////SubCat////////////////

  funScat() {
    var sbrecs = { catid: this.t1 }
    this.pobj.post("poduct/scatRec", sbrecs).subscribe(this.scatback)
  }
  scatback = (dt) => {
    this.pscatrec = JSON.parse(dt._body)
  }

  //  ===========sub sub cat =======================//
  ssubrec;
  ssChange() {
    var scatob = { scatid: this.t2 }
    this.pobj.post("/poduct/sscat", scatob).subscribe(dt => {
      this.ssubrec = JSON.parse(dt._body)
    })
  }

  //========================Brand ==========================//
  brdtrec;
  funBrand() {
    var brecd = { sscatid: this.ssub }
    this.pobj.post("poduct/brec", brecd).subscribe(this.bcbk)
  }
  bcbk = (dt) => {
    this.brdtrec = JSON.parse(dt._body)
  }


  /////For dropdown///=============
  pscatrec1
  funScat1() {
    var sbrecs = { catid: this.cat }
    this.pobj.post("poduct/scatRec", sbrecs).subscribe(this.scatback1)
  }
  scatback1 = (dt) => {
    //alert(dt._body)
    this.pscatrec1 = JSON.parse(dt._body)
  }

  // ===============  Subsub change2 ================
  ssubrec2;
  ssubChnge() {
    var sscatob = { scatid: this.sc }
    this.pobj.post("/poduct/sscat", sscatob).subscribe(dt => {
      this.ssubrec2 = JSON.parse(dt._body)
    })
  }
  //=================Brand Drp====================//
  brdtrec1; ssc
  funBrd1() {
    var brecd = { sscatid: this.ssc }
    this.pobj.post("poduct/brec", brecd).subscribe(this.bcbk1)
  }
  bcbk1 = (dt) => {
    this.brdtrec1 = JSON.parse(dt._body)
  }




  fungetPro() {
    this.pobj.get("poduct/getPro").subscribe(this.proback)
  }
  progetrec;
  proback = (dt) => {
    this.progetrec = JSON.parse(dt._body)
  }

  //========================== Delete===================
  funPdell(pnm) {
    var conf = confirm("Do You Want to Delete !")
    if (conf == true) {
      var precs = { _id: pnm }
      this.pobj.post("poduct/pdell", precs).subscribe(this.pdelback)
    }
  }
  pdelback = (dt) => {
    // alert(dt._body)
    this.fungetPro()
  }


  //=======================funScat1()============================//


  //=================Product Update============================//
  pglid = 0; pro; sc = ""; cat = ""; color; desc; price; new1; new2; bc = ""; uppco;

  UpdPro(prdobj) {
    this.pglid = prdobj._id
    this.bc = prdobj.bdid
    this.pro = prdobj.pname
    this.sc = prdobj.scatid
    this.cat = prdobj.catid
    this.ssc = prdobj.sscatid
    this.price = prdobj.pprice
    this.color = prdobj.pcolor
    this.desc = prdobj.pdesc
    this.new1 = (prdobj.catid)
    this.uppco = prdobj.upcoming
    this.funScat1();
    this.ssubChnge();
    this.funBrd1();

  }
  funPsave(fn33) {
    if (fn33.valid) {
      var oldprod = { _id: this.pglid }
      var newpord = { pname: this.pro, bdid: this.bc, scatid: this.sc, sscatid: this.ssc, catid: this.cat, pprice: this.price, pcolor: this.color, upcoming: this.uppco, pdesc: this.desc }
      var parr = [oldprod, newpord]
      this.pobj.post("poduct/UpdatePro", parr).subscribe(this.pupcback)
    }
    else {
      alert("Fail !!")
    }
  }
  pupcback = (dt) => {
    alert(dt._body)
    this.fungetPro()
    this.pglid = 0
  }

  //===================Sorting=======================//
  keyval = "cname"; pord = false
  proSort(procolumn) {
    this.keyval = procolumn
    this.pord = !this.pord
  }



  //=======================================file upload====================================
  file;txtoffer
  addoffer(pid){
    this.pglid = pid._id
  }
  saveoffer(){
    var old={_id:this.pglid}
    var newoffer={offer:this.txtoffer}
    this.pobj.post("poduct/addoffer",[old,newoffer]).subscribe(dd=>{
      alert(dd._body)
    })

  }
  /////////////////add more images
  imgloid=0
  addmoreimg(y){
    this.pglid =y._id
    
  }
  ///////////////////////
  add_more_image(){
var img2=<HTMLFormElement>document.getElementById('frm2')
img2.submit()

  }

  
  deactive(apid)
  {
    var obb={_id:apid}
    var newob={active:0}
    var arrr=[obb,newob]
    this.pobj.post("poduct/acivestatus",arrr).subscribe(dt=>{
     this.fungetPro()
    })
  }
  adctivate(aapid){
    var obb={_id:aapid}
    var newob={active:1}
    var arrr=[obb,newob]
    this.pobj.post("poduct/acivestatus",arrr).subscribe(dt=>{
     this.fungetPro()
  })
} 
} 