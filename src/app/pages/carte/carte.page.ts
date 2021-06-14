import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ItineraireModalPage } from 'src/app/itineraire-modal/itineraire-modal.page';
import { NavParamService } from 'src/app/services/navparam.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { GoogleMap } from '@ionic-native/google-maps';
import { Router } from '@angular/router';

declare var google: any;
const image = {
  url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
}
const photoLucie = {
  url: 'assets/girl-marker.png',
  scaledSize: new google.maps.Size(70, 70),
}
const photoMatthias = {
  url: 'assets/little-boy-marker.png',
  scaledSize: new google.maps.Size(70, 70),
}
const photoMaxence = {
  url: 'assets/man-marker.png',
  scaledSize: new google.maps.Size(70, 70),
}

@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage implements OnInit {
  map: GoogleMap;
  @ViewChild('map', { read: ElementRef, static: false }) mapElement: ElementRef;
  Geocoder;
  backdropVisible = false;
  MyLocation: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  estEnTrajet = false;
  afficherAlerte = false;
  positionSuscription: Subscription;
  infoWindows = [];
  markerLocalisation: any;
  users=[];
  afficherHeader = true;

  //Repères affichés sur la carte
  markers = [
    [
      "Place du Capitole",
      43.604652,
      1.444209,
      photoLucie,
      "Lucie",
      "green"
    ],
    [
      "Chupitos",
      43.6008071,
      1.4436933,
      photoMatthias,
      "Matthias",
      "grey"
    ],
    [
      "Zénith Toulouse Métropole",
      43.5982185, 
      1.4092514,
      photoMaxence, 
      "Maxence",
      "red"
    ]
  ];

  constructor(
    private geo: Geolocation,
    private modalCtrl: ModalController,
    private navService: NavParamService,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {
    this.getGeoLocation();
    this.afficherHeader = true;
  }

  ngOnInit() {
    //implémenter version sombre sur carte
    this.getGeoLocation();
  }

  /**
   * Récupérer géolocalisation
   */
  getGeoLocation() {
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
      geocoder.geocode(
        { location: latlng },
        (results: google.maps.GeocoderResult[]) => {
          this.navService.setGeo(results[0].formatted_address);
        }
      );
      //this.navService.setGeo('(' + res.coords.latitude + ', ' + res.coords.longitude + ')');
    });
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
    const { data } = await modal.onDidDismiss();
    this.calculateAndDisplayRoute(data);
    this.router.navigateByUrl('partager-trajet');
  }

  /**
   * Récupérer la géolocalisation et la date de destination
   * Affichage de l'itinéraire
   * Alimentation en bd du trajet effectué
   */
  calculateAndDisplayRoute(data) {
    this.afficherHeader = false;
    let that = this;
    var post;
    var latitude: number;
    var longitude: number;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16
    });
    this.directionsDisplay.setMap(map);

    //récupération de la géolocalisation pour centrer la map
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
        function () { }
      );
    } else {
      // Browser doesn't support Geolocation
    }

    console.log('source ' + this.navService.geoNavGeo());
    console.log('destination ' + this.navService.getNavData());

    //création de l'itinéraire
    this.directionsService.route(
      {
        origin: this.navService.geoNavGeo(),
        destination: this.navService.getNavData(),
        travelMode: 'DRIVING',
        drivingOptions: {
          departureTime: new Date(),  // for the time N milliseconds from now.
          trafficModel: 'optimistic'
        }

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
            this.navService.geoNavGeo() +
            ' / destination : ' +
            this.navService.getNavData()
          );
        }
      }
    );
    //ajout du trajet en bd
    this.firestore.collection('trajet').add({
      user: this.authService.currentUser.uid,
      start: this.navService.geoNavGeo(),
      destination: this.navService.getNavData()
    });
    this.estEnTrajet = true;
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
    this.users = [];
  }

  /**
   * Lecture des markers sur la carte et display de la fiche d'informations
   */
  addMarkersToMap(markers) {
    var i;
    //pour chaque marker
    for (i = 0; i < markers.length; i++) {
      //créer le marker
      let mapMarker = new google.maps.Marker({
        position: new google.maps.LatLng(markers[i][1], markers[i][2]),
        title: markers[i][4],
        latitude: markers[i][1],
        longitude: markers[i][2],
        icon: markers[i][3],
        color: markers[i][5],
        map: this.map,
      });
      this.users.push(mapMarker);
      this.addInfoWindow(mapMarker);
    }
  }

  //afficher un marker
  addInfoWindow(mapMarker) {
    //html du marker
    let window = '<div id="content">'+
      '<div style="text-align: center;"><img src="' + mapMarker.icon.url + '" width="75"></img></div>'+
        '<ion-row"><h3 id="firstHeading" class="firstHeading" style="text-align:left;">' +
          mapMarker.title + 
        '</h3>'+
        '<div style="width: 30px; height: 30px; border-radius: 20px; text-align:right; background:'+ mapMarker.color+';">'+
        '</div>'+
      '</div>' 
      +'</ion-row>'
      +'<p>'+
        'Localisation : ' + mapMarker.position + 
      '</p>'+
      '<p>'+
        '<div style="text-align: center;"><ion-button id="tap">'+
          'Contacter'+
        '</ion-button></div>'+
      '</p>'
    var infoWindow = new google.maps.InfoWindow({
      title: mapMarker.title,
      content: window,
    });
    //on click d'un marker
    mapMarker.addListener('click', () => {
      //fermer un marker déjà ouvert
      this.closeAllWindow();
      //ouvrir le marker
      infoWindow.open(this.map, mapMarker);
    });
    //action quand on clique sur Contacter
    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      document.getElementById('tap').addEventListener('click', () => {
        //redirection vers les groupes de l'utilisateur
        this.router.navigateByUrl('home/groupe');
      });
    });
    //ajouter la description à la liste des markers
    this.infoWindows.push(infoWindow);
  }

  /**
   * Fermer toutes les markers
   */
  closeAllWindow(){
    for (let window of this.infoWindows){
      window.close();
    }
  }

  /**
   * Afficher le drawer pour lever une alerte
   */
  displayAlerts() {
    this.afficherHeader = false;
    this.estEnTrajet = false;
    this.afficherAlerte = true;
  }

  findUser(user){
    this.users.forEach((data) => {
      if (data == user){
        this.infoWindows.forEach((info) => {
          if (info.title == user.title){
            this.closeAllWindow();
            info.open(this.map, data);
          }
        })
      }
    })
  }
}
