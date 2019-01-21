import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-deliverystatus',
  templateUrl: './deliverystatus.component.html',
  styleUrls: ['./deliverystatus.component.css']
})
export class DeliverystatusComponent implements OnInit {

  constructor(public hobj:Http) { this.funPurchase() }

  ngOnInit() {
  }
  purdata;
 funPurchase(){
    this.hobj.get("poduct/getPuarchage").subscribe(dt=>{
        this.purdata=JSON.parse(dt['_body'])
       // alert(this.purdata)
       console.log(this.purdata[1].Products[0].pname)
    })
 }
 delstatus="";
 delState(dt){
   alert(dt)
 }
}
