import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {Router} from "@angular/router"
@Component({
  selector: 'app-adminlog',
  templateUrl: './adminlog.component.html',
  styleUrls: ['./adminlog.component.css']
})
export class AdminlogComponent implements OnInit {

  constructor(public http:Http,public rout:Router) { }

  ngOnInit() {
  }
  logdata;email;password
  logrec;
funadmLog(){
  this.logdata={admID:this.email,admPass:this.password}
  this.http.post("log/logData",this.logdata).subscribe(this.logcback)
}
logcback=(dt)=>{
  this.logrec=(JSON.parse(dt._body));
  if(this.logrec.length==1)
  {
    localStorage.setItem("gaurd","1")
    this.rout.navigateByUrl("/details")
  }
  else
  {
    alert("Enter currect id and Password")
  }
}
}
