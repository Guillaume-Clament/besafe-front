import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-itineraire-modal',
  templateUrl: './itineraire-modal.page.html',
  styleUrls: ['./itineraire-modal.page.scss'],
})
export class ItineraireModalPage implements OnInit {
  @Input() start: any;
  @Input() destination; any;

  constructor(
    private modalCtrl: ModalController
  ) { }

  async close(){
    await this.modalCtrl.dismiss({
      destination: 'Marseille'
    });
  }

  ngOnInit() {
  }

}
