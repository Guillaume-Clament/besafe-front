import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-partager-trajet',
  templateUrl: './partager-trajet.page.html',
  styleUrls: ['./partager-trajet.page.scss'],
})
export class PartagerTrajetPage implements OnInit {
  anges = [];
  groupes = [];

  constructor(
    public firestore: AngularFirestore,
    private router: Router
  ) { 
    this.getAnges();
    this.getGroupes();
  }

  getGroupes() {
    this.firestore
      .collection('groupes')
      .snapshotChanges(['added', 'removed', 'modified'])
      .subscribe((groupes) => {
        groupes.forEach((groupe) => {
          this.groupes.push({
            id: groupe.payload.doc.id,
            nom: groupe.payload.doc.data()['nom']
          });
        });
      });
  }

  getAnges() {
    this.firestore
      .collection('anges')
      .snapshotChanges(['added', 'removed', 'modified'])
      .subscribe((groupes) => {
        groupes.forEach((groupe) => {
          this.anges.push({
            id: groupe.payload.doc.id,
            nom: groupe.payload.doc.data()['nom'],
            prenom: groupe.payload.doc.data()['prenom'],
            pseudo: groupe.payload.doc.data()['pseudo'],
          });
        });
      });
  }

  close(){
    this.router.navigateByUrl('home/carte');
  }

  ngOnInit() {
  }

}
