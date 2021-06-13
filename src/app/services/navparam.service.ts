import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NavParamService {
  navAdresse:any;
  navData:any;
  navGeo:any;
  constructor() { }

  setGeo(geoObj){
    this.navGeo = geoObj;
  }

  geoNavGeo(){
    if (this.navGeo === 'undefined'
        || this.navGeo === null){
      return 0;
    } else {
      return this.navGeo;
    }
  }

  setNavaData(navObj){
    this.navData = navObj;
  }

  getNavData(){
    if (this.navData === 'undefined'
        || this.navData === null){
      return 0;
    } else {
      return this.navData;
    }
  }

  setAdresse(navObj){
    this.navAdresse = navObj;
  }

  getAdresse(){
    if (this.navAdresse === 'undefined'
        || this.navAdresse === null){
      return 0;
    } else {
      return this.navAdresse;
    }
  }
}
