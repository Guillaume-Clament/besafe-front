import { Component, OnInit } from '@angular/core';

declare var google: any;
@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage {
  map:any;

  constructor(
  ) { 
  }

  ionViewDidEnter(){
    this.map = new google.maps.Map(document.getElementById("map"),{
      center : { lat: -34.397, lng: 150.644 },
      zoom: 8,

    });
  }

}
