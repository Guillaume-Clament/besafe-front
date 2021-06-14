import { Component, OnInit } from '@angular/core';
import {
  Plugins,
  CameraResultType,
  CameraSource,
  CameraDirection,
} from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fin-alerte',
  templateUrl: './fin-alerte.page.html',
  styleUrls: ['./fin-alerte.page.scss'],
})
export class FinAlertePage implements OnInit {
  photo: SafeResourceUrl;

  constructor(public alertController: AlertController,
    private sanitizer: DomSanitizer,
    private navCtrl: NavController

  ) { }

  ngOnInit() {
  }

  goToCarte() {
    this.navCtrl.navigateBack('home/carte');
  }

  /*goToValidation(){
    this.router.navigateByUrl('validation-trajet');
  }*/

  async repondreQuestion() {
    let alert = this.alertController.create({
      //title: 'Confirm purchase',
      message: 'Quel est votre chiffre préféré ?',
      inputs: [
        {
          name: 'reponse'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Valider',
          handler: data => {
            if (data.name == null){
              window.alert('Erreur : Le champ est vide.');
            } else {
              this.navCtrl.navigateBack('home/carte');
            }
          }
        }
      ]
    });
    (await alert).present();
  }

  /**
  * Gestion d'une alerte de type "M'enregistrer"
  */
  async ouvrirCamera() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      direction: CameraDirection.Front,
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
  }

  async saisirCode() {
    let alert = this.alertController.create({
      //title: 'Confirm purchase',
      message: 'Quel est votre code secret ?',
      inputs: [
        {
          name: 'reponse',
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Valider',
          handler: data => {
            if (data.name == null){
              window.alert('Erreur : Le champ est vide.');
            } else {
              this.navCtrl.navigateBack('home/carte');
            }
          }
        }
      ]
    });
    (await alert).present();
  }

}
