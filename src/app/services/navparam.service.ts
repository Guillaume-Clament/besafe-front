import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NavParamService {

  navData:any;
  constructor() { }

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
}
