import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonSearchbar, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ItineraireModalPage } from 'src/app/itineraire-modal/itineraire-modal.page';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NavParamService } from 'src/app/services/navparam.service';

declare var google: any;
@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage implements AfterViewInit {
  @ViewChild('map', {read: ElementRef, static: false}) mapElement: ElementRef;
  map: any;
  backdropVisible = false;
  destination: any = '';
  MyLocation: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  positionSuscription: Subscription;
  markers: any[];

  constructor(
    private geo: Geolocation,
    private modalCtrl: ModalController,
    private navService: NavParamService,
  ) {
    this.geo.getCurrentPosition().then((res) => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        MyLocation: new google.maps.LatLng(res.coords.latitude, res.coords.longitude),
      });
    })
  }

  ngAfterViewInit() {

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

  calculateAndDisplayRoute(directionFromForm: string) {
    let that = this;
    var post;
    var latitude:number;
    var longitude:number;
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
          post = pos;
          latitude = pos.lat;
          longitude = pos.lng;
          map.setCenter(pos);
          that.MyLocation = new google.maps.LatLng(latitude, longitude);
        },
        function () {}
      );
    } else {
      // Browser doesn't support Geolocation
    }

    console.log('source ' + that.MyLocation);
    console.log('destination ' + this.navService.getNavData());

    this.directionsService.route(
      {
        origin: that.MyLocation,
        destination: this.navService.getNavData(),
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
<<<<<<< Updated upstream
=======
    this.firestore
      .collection('trajet')
      .add({
        user: this.authService.currentUser.uid,
        start: this.navService.geoNavGeo(),
        heure: new Date().toISOString(),
        destination: this.navService.getNavData()
      })
>>>>>>> Stashed changes
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
        this.markers.push(this.map);
        let position = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
        let mapMarker = new google.maps.Marker({
            position: position,
            latitude: res.coords.latitude, 
            longitude: res.coords.longitude
        })
      })
      .catch((e) => {
        console.log(e);
      });
  }

}
