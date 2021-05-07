import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'

declare var google: any;
@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage {
  map:any;

  constructor(
    private geo: Geolocation
  ) { 
  }

  ionViewDidEnter(){
    this.geo.getCurrentPosition().then((res) => {
      this.map = new google.maps.Map(document.getElementById("map"),{
        center : { lat: res.coords.latitude, lng: res.coords.longitude },
        zoom: 8,
      });

      var marker = new google.maps.Marker({
        position: { 
          lat: res.coords.latitude, lng: res.coords.longitude
        },
        map: this.map
      })
    }).catch( e => {
      console.log(e);
    })
    
  }

}
