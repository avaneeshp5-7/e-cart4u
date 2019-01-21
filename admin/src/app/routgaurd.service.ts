import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import {DetailsComponent} from "./details/details.component"
import {Router} from "@angular/router"
@Injectable({
  providedIn: 'root'
})
export class RoutGaurdService implements CanActivate,CanActivateChild {
constructor(private rout:Router){}

  canActivate(){
       if(localStorage.getItem("gaurd")!=null){
         
       }
      return true
  }
  canActivateChild(){
      return confirm('Do u want to enter in to child one ..');
  }  
}
