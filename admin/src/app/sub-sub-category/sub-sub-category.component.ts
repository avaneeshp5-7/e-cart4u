import { Component, OnInit,Inject } from '@angular/core';
import { Http } from "@angular/http"
import { element } from 'protractor';

@Component({
  selector: 'app-sub-sub-category',
  templateUrl: './sub-sub-category.component.html',
  styleUrls: ['./sub-sub-category.component.css']
})
export class SubSubCategoryComponent implements OnInit {

  constructor(@Inject(Http) public ssobj) {this.funCat();this.ssubGet() }
catrec;scatrec
  funCat(){
    this.ssobj.get("ssubcat/catRec").subscribe(this.catbck) 
  }
  catbck=(dt)=>{
    this.catrec=JSON.parse(dt._body)
  }
cid="";scid="";
  funScatat(){
   var catob={catid:this.cid}
 
    this.ssobj.post("ssubcat/scatRec",catob).subscribe(this.scatbck)
  }
    scatbck=(dt)=>{
    this.scatrec=JSON.parse(dt._body)

  }
  sscnm;msg1;;msg2;;msg3;
  funSubsubCat(ffrm){
    if(ffrm.valid==false)
    {
      this.msg1=" * Select Category"
      this.msg2=" * Select Sub Category"
      this.msg3= " * Enter Sub Sub Cartegory"
    }
    else
    {
    var ssubob={catid:this.cid,scatid:this.scid,subscatname:this.sscnm}
    this.ssobj.post("ssubcat/subrec",ssubob).subscribe(this.sscbck)
  }
}
     sscbck=(dt)=>{
       alert(dt._body)
       this.ssubGet();
       this.cid="";
       this.scid="";
       this.sscnm="";
     }

  ngOnInit() {
  }
  ssrec;
 ssubGet(){
       this.ssobj.get("ssubcat/getsubrec").subscribe(dt=>{
       this.ssrec=JSON.parse(dt._body)
       //alert(dt._body)
     })
 }
 cnrec;
 cnFunn(){
  var catob={catid:this.upcat}

   this.ssobj.post("ssubcat/scatRec",catob).subscribe(this.cnbck)
 }
   cnbck=(dt)=>{
   this.cnrec=JSON.parse(dt._body)
    }
 funBdell(ssdata){
         var deldtata={_id:ssdata}
         this.ssobj.post("ssubcat/delsubrec",deldtata).subscribe(dt=>{
           alert(dt._body)
           this.ssubGet()
         })
 }
 upcat;upscat;upss;ssgloid;upsscat
 sscatUpd(updata){
      this.ssgloid=updata._id
      this.upcat=updata.catid;
      this.upscat=updata.scatid
      this.upsscat=updata.subscatname
      this.cnFunn();
 }
 ssubSave(){
  var oldsscat={_id:this.ssgloid}
  var newsscat={catid:this.upcat,scatid:this.upscat,subscatname:this.upsscat}
  var updata=[oldsscat,newsscat]
  this.ssobj.post("ssubcat/Updet",updata).subscribe(dt=>{
    alert(dt._body)
    this.ssgloid=0;
    this.ssubGet();
  })
 }


// ==================== Sorting ========================//

ssubsord=false;keyval="subscatname"
sssubSort(ssub){
       this.keyval=ssub
       this.ssubsord = !this.ssubsord
}
}
