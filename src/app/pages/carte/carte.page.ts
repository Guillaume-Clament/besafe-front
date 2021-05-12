import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonSearchbar, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ItineraireModalPage } from 'src/app/itineraire-modal/itineraire-modal.page';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

declare var google: any;
@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage implements AfterViewInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  backdropVisible = false;
  destination: any = '';
  MyLocation: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  positionSuscription: Subscription;

  constructor(
    private geo: Geolocation,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.route.params.subscribe((params) => {
      this.destination = params['id'];
      console.log(this.destination);
    });
  }

  ngAfterViewInit() {
    if (this.destination != '' && this.MyLocation != '') {
      if (
        this.MyLocation === 'undefined' ||
        this.MyLocation === 'null' ||
        this.MyLocation === ''
      ) {
        window.alert(
          'Attention, nous ne pouvons pas accéder à votre géolocalisation.'
        );
      } else if (this.destination === 'undefined') {
        window.alert('Erreur dans la saisie de votre adresse de destination.');
      } else {
        this.calculateAndDisplayRoute();
      }
    } else {
      return;
    }
  }

  toggleBackdrop(isVisible) {
    this.backdropVisible = isVisible;
  }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: ItineraireModalPage,
    });
    await modal.present();
    modal.onDidDismiss();
  }

  calculateAndDisplayRoute() {
    let that = this;
    var post;
    var latitude;
    var longitude;
    var loc:String;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
    });
    this.directionsDisplay.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
          latitude = '' + pos.lat;
          longitude = '' + pos.lng;
          post = pos;
          that.MyLocation = new google.maps.LatLng(pos.lat, pos.lng);
          loc = '70 Avenue de Rangueil, Toulouse';
          console.log(pos.lat + ' ' + pos.lng);
          //console.log(this.destination);
          console.log(loc);
        },
        function () {}
      );
    } else {
      // Browser doesn't support Geolocation
    }

    this.directionsService.route(
      {
        origin: loc,
        destination: '75 Avenue de Rangueil, Toulouse',
        travelMode: 'DRIVING',
      },
      function (response, status) {
        if (status === 'OK') {
          console.log(
            'source : ' +
              response +
              ' / destination : ' +
              response.request.destination
          );
          console.log(response.request.destination);
          that.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
          console.log(
            'source : ' +
              this.MyLocation +
              ' / destination : ' +
              this.destination
          );
        }
      }
    );
  }

  ionViewDidEnter() {
    this.geo
      .getCurrentPosition()
      .then((res) => {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: res.coords.latitude, lng: res.coords.longitude },
          zoom: 17,
        });

        var marker = new google.maps.Marker({
          position: {
            lat: res.coords.latitude,
            lng: res.coords.longitude,
          },
          map: this.map,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
