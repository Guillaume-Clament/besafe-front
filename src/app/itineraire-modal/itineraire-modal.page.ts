import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Feature, MapboxService } from '../services/mapbox.service';


@Component({
  selector: 'app-itineraire-modal',
  templateUrl: './itineraire-modal.page.html',
  styleUrls: ['./itineraire-modal.page.scss'],
})
export class ItineraireModalPage implements OnInit {
  addresses: string[] = [];
  selectedAdress = null;
  
  constructor(
    private modalCtrl: ModalController,
    private mapBoxService: MapboxService
  ) { }

  async close(){
    await this.modalCtrl.dismiss({
      destination: 'Marseille'
    });
  }

  ngOnInit() {
  }

  search(event:any){
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0){
      this.mapBoxService
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.addresses = features.map(feat => feat.place_name);
        });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address:any){
    this.selectedAdress = address;
    this.addresses = [];
  }
}
