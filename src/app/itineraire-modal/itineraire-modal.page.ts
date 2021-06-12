import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Feature, MapboxService } from '../services/mapbox.service';
import { NavParamService } from '../services/navparam.service';

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
    private mapBoxService: MapboxService,
    private navCtrl: NavController,
    private navService: NavParamService,
    private router: Router
  ) {}

  onDidDismiss() {
    const {destination} = this.selectedAdress;
  }

  close(){
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapBoxService
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.addresses = features.map((feat) => feat.place_name);
        });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address: any) {
    this.selectedAdress = address;
    this.addresses = [];
  }

  pushPage() {
    if (this.selectedAdress === null) {
      return;
    } else {
      this.navService.setNavaData(this.selectedAdress);
      this.modalCtrl.dismiss();
    }
  }
}
