import { Component, Inject } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router"
@Component({

  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']

})
export class CategoryComponent {
  constructor(@Inject(Http) public cobj) { this.funGet() }
  cnm; cst; getcat; globid = 0; editcnm; ediact
  //=====================================Update Category==================================//
  funUpdate(obdata) {
    this.globid = (obdata._id)
    this.editcnm = (obdata.cname)
  }
  funSave(f11) {
    if (f11.valid == false) {
      alert("Fail !!!")
    }
    else {
      var oldob = { _id: this.globid }
      var newob = { _id: this.globid, cname: this.editcnm, active: 1 }
      var arr = [oldob, newob]
      this.cobj.post("category/catUpdate", arr).subscribe(this.upcatback)
    }
  }

  upcatback = (dt) => {
    alert(dt._body)
    this.funGet()
    this.globid = 0
  }

  msg: String = "";
  funCat(fr1) {
    if (fr1.valid) {
      var catob = { cname: this.cnm }
      this.cobj.post("category/catdata", catob).subscribe(this.cb)
    }
    else {
      this.msg = " * Enter Category Name"
    }
  }
  cb = (dt) => {
    alert(dt._body)
    this.funGet();
    this.cnm = ""
  }

  funGet() {
    this.cobj.get("category/getcato").subscribe(this.catcab)
  }
  catcab = (dt) => {
    this.getcat = JSON.parse(dt._body)
  }
  dob
  funDel(cn) {
    var conf=confirm("Do You Want to Delete")
    if(conf==true){
    this.dob = { _id: cn }
    this.cobj.post("category/delRec",this.dob).subscribe(this.delback)
  }
 
}
  delback = (dt) => {
    this.funGet()
  }

  //=====================================Sorting=============================================//
  key = "cname"
  ord = false
  sortFun(clmname) {
    this.key = clmname
    this.ord = !this.ord
  }
}