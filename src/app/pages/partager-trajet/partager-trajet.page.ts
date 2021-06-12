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
      .subscribe((anges) => {
        anges.forEach((ange) => {
          this.anges.push({
            id: ange.payload.doc.id,
            nom: ange.payload.doc.data()['nom'],
            prenom: ange.payload.doc.data()['prenom'],
            pseudo: ange.payload.doc.data()['pseudo'],
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
