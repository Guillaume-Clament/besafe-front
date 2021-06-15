import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-anges",
  templateUrl: "./anges.page.html",
  styleUrls: ["./anges.page.scss"],
})

export class AngesPage implements OnInit {
  veutModifier = false;
  newPseudo: String;
  anges = [];

  constructor(
    private alertController: AlertController,
    private firestore: AngularFirestore
  ) {
    this.getAnges();
    this.anges = [];
  }

  ngOnInit() { }

  async ajouterAnge() {
    let alert = this.alertController.create({
      //title: 'Confirm purchase',
      message: "Veuillez saisir le pseudo de l'ange recherché",
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
            this.firestore.collection('anges').add({
              pseudo: data.reponse,
              prenom: "Test",
              image: "http://placekitten.com/500/300"
            })
          }
        }
      ]
    });
    (await alert).present();

  }

  getAnges() {
    this.firestore
      .collection('anges')
      .snapshotChanges(['added', 'removed', 'modified'])
      .subscribe((anges) => {
        anges.forEach((ange) => {
          this.anges.push({
            id: ange.payload.doc.id,
            prenom: ange.payload.doc.data()['prenom'],
            photo: ange.payload.doc.data()['photo'],
            pseudo: ange.payload.doc.data()['pseudo'],
          });
        });
      });
    console.log(this.anges[0]);
  }

  modifier() {
    if (this.veutModifier == false) {
      this.veutModifier = true;
    } else {
      this.veutModifier = false;
    }
  }

  supprimer(user) {
    /*    //supprimer en bd
        if (this.firestore.collection('anges').doc(user) == user) {
          this.firestore
            .collection('anges').doc(user).delete().then((res) => {
              console.log("RESULTAT : " + res);
            }).catch((er
          //supprimer dans le tab d'affichage 
          */
    this.anges.forEach((data, index) => {
      if (data == user) {
        this.anges.splice(index, 1);
      }
    });
  }
}
