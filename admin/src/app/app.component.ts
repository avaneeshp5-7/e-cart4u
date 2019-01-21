import { Component,Inject } from '@angular/core';
import {Http} from "@angular/http";
import {Router} from "@angular/router"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(Router) public robj){} 
  funSearch(){
    alert("Hii")
  } 


}
