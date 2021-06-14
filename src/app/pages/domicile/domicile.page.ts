import { Component, OnInit } from '@angular/core';
import { NavParamService } from 'src/app/services/navparam.service';

export interface Utilisateur {
  adresse: String,
  cp: String,
  ville: String
}
@Component({
  selector: 'app-domicile',
  templateUrl: './domicile.page.html',
  styleUrls: ['./domicile.page.scss'],
})
export class DomicilePage implements OnInit {
  afficherDrawer = false;
  backdropVisible = false;
  veutModifier = false;
  adresseActuelle: Utilisateur[] = [{
    adresse: "Lorem Ipsum",
    cp: "31000",
    ville: "Toulouse"
  }]
  newAdresse: Utilisateur;
  adresse: String;
  cp: String;
  ville: String;

  constructor() { }

  ngOnInit() {
  }

  modifierAdresse() {
    if (this.veutModifier == false) {
      this.veutModifier = true;
    } else {
      this.veutModifier = false;
    }
  }

  opererChgt() {
    this.adresseActuelle.forEach((data, index) => {
      this.adresseActuelle.splice(index, 1);
    })
    this.newAdresse = {
      adresse: this.adresse,
      cp: this.cp,
      ville: this.ville,
    }
    this.adresseActuelle.push(this.newAdresse);
    this.veutModifier = false;
  }
}
