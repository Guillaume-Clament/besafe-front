import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-itineraire-modal',
  templateUrl: './itineraire-modal.page.html',
  styleUrls: ['./itineraire-modal.page.scss'],
})
export class ItineraireModalPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  async close(){
    await this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
