import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
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
    private mapBoxService: MapboxService,
    private navCtrl: NavController
  ) {}

  async close() {
    await this.modalCtrl.dismiss({
      destination: 'Marseille',
    });
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
      this.modalCtrl.dismiss();
      this.navCtrl.navigateForward(`carte/${this.selectedAdress}`);
    }
  }
}
