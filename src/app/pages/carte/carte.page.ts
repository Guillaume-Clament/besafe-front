import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ItineraireModalPage } from 'src/app/itineraire-modal/itineraire-modal.page';
import { NavParamService } from 'src/app/services/navparam.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { GoogleMap } from '@ionic-native/google-maps';

declare var google: any;
const image = {
  url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
}
const photo = {
  url: 'assets/marker-1.jpg',
  scaledSize: new google.maps.Size(50, 50),
}

@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage implements OnInit {
  map: GoogleMap;
  @ViewChild('map', {read: ElementRef, static:false}) mapElement: ElementRef;
  Geocoder;
  backdropVisible = false;
  destination: any = '';
  MyLocation: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  positionSuscription: Subscription;
  infoWindows = [];

  //Repères affichés sur la carte
  markers = [
    [
      "Place du Capitole",
      43.604652,
      1.444209,
      photo,
      "Lucie",
    ], 
    [
      "Chupitos",
      43.6008071, 
      1.4436933,
      image,
      "Matthias",
    ]
  ];

  constructor(
    private geo: Geolocation,
    private modalCtrl: ModalController,
    private navService: NavParamService,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    const geocoder = new google.maps.Geocoder();
    //récupérer la géolocalisation
    this.geo.getCurrentPosition().then((res) => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        MyLocation: new google.maps.LatLng(
          res.coords.latitude,
          res.coords.longitude
        ),
      });
      const latlng = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      };
      //Encodage des données (lat,lng) en une adresse précise
      /*geocoder.geocode(
        { location: latlng },
        (results: google.maps.GeocoderResult[]) => {
          this.navService.setGeo(results[0].formatted_address);
        }
      );*/
      this.navService.setGeo('(' + res.coords.latitude + ', ' + res.coords.longitude + ')');
    });
  }

  ngOnInit() {
    //implémenter version sombre sur carte
  }

  /**
   * Effet de style quand le drawer est tiré
   */
  toggleBackdrop(isVisible) {
    this.backdropVisible = isVisible;
  }

  /**
   * Lien vers le modal pour rechercher un itinéraire
   */
  async showModal() {
    const modal = await this.modalCtrl.create({
      component: ItineraireModalPage,
    });
    await modal.present();
    modal.onDidDismiss();
  }

  /**
   * Récupérer la géolocalisation et la date de destination
   * Affichage de l'itinéraire
   * Alimentation en bd du trajet effectué
   */
  calculateAndDisplayRoute() {
    let that = this;
    var post;
    var latitude: number;
    var longitude: number;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
    });
    this.directionsDisplay.setMap(map);

    //récupération de la géolocalisation
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

    //création de l'itinéraire
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
    //ajout du trajet en bd
    this.firestore.collection('trajet').add({
      user: this.authService.currentUser.uid,
      start: this.navService.geoNavGeo(),
      destination: this.navService.getNavData(),
    });
  }

  /**
   * Load de la map (avec les markers)
   */
  ionViewDidEnter() {
    this.geo
      .getCurrentPosition()
      .then((res) => {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: res.coords.latitude, lng: res.coords.longitude },
          zoom: 17,
        });
      this.addMarkersToMap(this.markers); 
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Lecture des markers sur la carte et display de la fiche d'informations
   */
  addMarkersToMap(markers){
    var i;
    for (i = 0; i < markers.length; i++){
      let mapMarker = new google.maps.Marker({
        position: new google.maps.LatLng(markers[i][1], markers[i][2]),
        title: markers[i][4],
        latitude: markers[i][1], 
        longitude: markers[i][2],
        icon: markers[i][3],
        map: this.map,
      });
      var infoWindow = new google.maps.InfoWindow({
        content: "Ceci est la position de " + markers[i][4],
      });
      mapMarker.addListener('click', () => {
        infoWindow.open(this.map, mapMarker);
      });
    }
  }
}
