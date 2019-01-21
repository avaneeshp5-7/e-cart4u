import { Component,Inject } from '@angular/core';
import {Http} from "@angular/http";
import {Router} from "@angular/router"

@Component({
  
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent {
  constructor(@Inject(Http) public scobj){
    this.funGetRec()
    this.funGetCat()
    }
   scnm;status;cid:any="";getre;catrec;
    /////// /////////////Adding subcategory////////////////////////////////// 
    msg1:String=""
    msg2:String=""
    msg3:String="";
   funSubCat(fr2){
     if(fr2.valid){
     var subrec={catid:this.cid,scatname:this.scnm,"active":1}
     this.scobj.post("subcat/scatrec",subrec).subscribe(this.sback)
    }
    else
    {
      this.msg1=" * Select Category !!";
      this.msg2=" * Enter Subcategory !!"
      this.msg3=" * Select Category !!"
    }
   }
     sback=(dt)=>{
     alert(dt._body)
     this.funGetRec()
   }
   /////// /////////////Get Category data for binding///////////////////////////
   catrec1
   funGetCat()
        {
          this.scobj.get("category/getcato").subscribe(this.scatcab)
        }
          scatcab=(dt)=>{
          this.catrec1=JSON.parse(dt._body)  
          this.catnm=this.newtmp
        }
  //////////////////////Get subCategory record////////////////////////////////////          
        funGetRec(){
          this.scobj.get("subcat/getrec").subscribe(this.scatcbac)
        }
        scatcbac=(dt)=>{
          this.getre=JSON.parse(dt._body) 
         // alert(dt._body)
         this.cid=""
         this.scnm=""
         
        }
/////////=========== Delete ==================/////////////
        funDell(scn){
          var conf=confirm("Do You want to Delete !")
          if(conf==true){
          var ddl={_id:scn}
          this.scobj.post("subcat/DelScatrec",ddl).subscribe(this.delback)
        }
        
      }
        delback=(dt)=>{
          alert(dt._body)
          this.funGetRec()
        }
//////////////////===============Update SubCat=============///////////////////
glid="";scupd;newtmp="";
funUpdt(scob){
this.glid=scob._id
this.scupd=scob.scatname
this.catnm=scob.cname
this.catnm=scob.catid
//alert(this.newtmp)
}
catnm=""
funSubSave(ff2){
  if(ff2.valid==false)
  alert("Fail ! !")
  else
  {
var oldsubval={_id:this.glid}
var newval={scatname:this.scupd,catid:this.catnm}
var subarr=[oldsubval,newval]
this.scobj.post("subcat/updSub",subarr).subscribe(this.upback)
}
}
upback=(dt)=>{
alert(dt._body)
this.funGetRec()
this.glid=""
}

//==============Sorting================//

keyval="";
scord=false;
scatSort(scls){
   this.keyval=scls
   this.scord=!this.scord
}

}

