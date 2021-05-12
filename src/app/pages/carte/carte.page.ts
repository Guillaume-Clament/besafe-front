import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { IonSearchbar, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ItineraireModalPage } from 'src/app/itineraire-modal/itineraire-modal.page';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";

declare var google: any;
@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage implements AfterViewInit {
  @ViewChild('map') mapElement: ElementRef;
  map:any;
  backdropVisible = false;
  destination: any = '';
  MyLocation: any;

  positionSuscription: Subscription;

  constructor(
    private geo: Geolocation, 
    private modalCtrl: ModalController, 
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { 
    
    this.route.params.subscribe(params => {
      this.destination = params['id']; 
    });
  }
  
  ngAfterViewInit() {
    if (this.destination != '' && this.MyLocation != ''){
      if (this.MyLocation === "undefined" || this.MyLocation === "null" || this.MyLocation === ''){
        window.alert("Attention, nous ne pouvons pas accéder à votre géolocalisation.");
      } else if (this.destination === "undefined"){
        window.alert("Erreur dans la saisie de votre adresse de destination.")
      } else {
        console.log(this.MyLocation);
        this.calculateAndDisplayRoute();
      }
    } else {
      return;
    }
  }

  toggleBackdrop(isVisible){
    this.backdropVisible = isVisible;
  }

  async showModal(){
    const modal = await this.modalCtrl.create({
      component: ItineraireModalPage
    })
    await modal.present();
    modal.onDidDismiss();
  }
  
  calculateAndDisplayRoute() {
    let that = this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        that.MyLocation = new google.maps.LatLng(pos);
        console.log(that.MyLocation);

      }, function() {

      });
    } else {
      // Browser doesn't support Geolocation
    }

    directionsService.route({
    origin: this.MyLocation,
    destination: this.destination,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      console.log('source : ' + this.MyLocation + ' / destination : ' + this.destination);
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
      console.log('source : ' + this.MyLocation + ' / destination : ' + this.destination);
    }
  });
}

  ionViewDidEnter(){
    this.geo.getCurrentPosition().then((res) => {
      this.map = new google.maps.Map(document.getElementById("map"),{
        center : { lat: res.coords.latitude, lng: res.coords.longitude },
        zoom: 17,
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
