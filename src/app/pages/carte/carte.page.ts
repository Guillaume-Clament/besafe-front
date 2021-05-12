import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { IonSearchbar, ModalController } from '@ionic/angular';
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
export class CartePage {
  @ViewChild('search', {static:false}) search: IonSearchbar;
  //@ViewChild('map') mapElement: ElementRef;
  map:any;
  currentMapTrack = null;
  backdropVisible = false;
  destination = null;
  start="Marseille";

  isTracking = false;
  trackedRoute = [];
  previousTracks = [];

  positionSuscription: Subscription;
  directionsService = new google.maps.DirectionsService;
  directionDisplay = new google.maps.DirectionsRenderer;

  constructor(
    private geo: Geolocation, 
    private modalCtrl: ModalController, 
    private route: ActivatedRoute
  ) { 
    this.start = new google.maps.LatLng(this.geo.getCurrentPosition().then((res) => {
      lat: res.coords.latitude;
      lng: res.coords.longitude
    }));
    this.route.params.subscribe(params => {
      this.destination = params['id']; 
      this.calculateAndDisplayRoute(this.start, this.destination);
    });
  }

  toggleBackdrop(isVisible){
    this.backdropVisible = isVisible;
  }

  async showModal(){
    const modal = await this.modalCtrl.create({
      component: ItineraireModalPage, 
      componentProps: { 
        destination: 'Marseille'
      }
    })
    await modal.present();
    modal.onDidDismiss()
  }
  
  calculateAndDisplayRoute(start, destinationFromModal){
    const that = this;
    this.directionsService.route({
      origin: start,
      destination: destinationFromModal,
      travelMode: 'DRIVING'
    }, (response,status) =>{
      if (status === 'OK'){
        that.directionDisplay.setDirections(response);
      } else {
        window.alert('ERREUR : ' + status);
      }
    });
  }

  loadHistoricRoutes(){
    /*
    this.storage.get('routes').then(data => {
      if (data){
        this.previousTracks = data;
      }
    });
    */
  }

  ionViewDidEnter(){
    /*
    let mapOptions = {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false, 
      streetViewControl: false,
      fullScreenControl: false
      
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.geo.getCurrentPosition().then(pos => {
      let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      this.map.setCenter(latLng);
      this.map.setZoom(16);
    });
    
    this.plt.ready().then(() => {
      this.loadHistoricRoutes();
    });
    
    */

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

  startDrawing(){
    this.isTracking = true; 
    this.positionSuscription = this.geo.watchPosition()
    .pipe( 
      filter(p => p.coords !== undefined)
    )
    .subscribe(data => {
      setTimeout(() =>{
        this.trackedRoute.push({lat : data.coords.latitude, lng : data.coords.longitude});
        this.redrawPath(this.trackedRoute);
      })
    })
  }

  redrawPath(path){
    if (this.currentMapTrack){
      this.currentMapTrack.setMap(null);
    }

    if (path.length > 1){
      this.currentMapTrack = new google.maps.Polyline({
        path: path, 
        geodesic: true, 
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
    }

    this.currentMapTrack.setMap(this.map);
  }

  stopTracking(){
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute};
    this.previousTracks.push(newRoute);
    //this.storage.set('routes', this.previousTracks);

    this.isTracking = false;
    this.positionSuscription.unsubscribe();
    this.currentMapTrack.setMap(null);
  }

  showHistoryRoute(route){
    this.redrawPath(route);
  }

}
