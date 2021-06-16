import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-details-groupe',
  templateUrl: './details-groupe.page.html',
  styleUrls: ['./details-groupe.page.scss'],
})
export class DetailsGroupePage implements OnInit {
  nomGroupe = '';
  admin = '';
  listeGroupe = [];
  listeMessages = [];


  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    public alertController: AlertController
    ) {
    var nomGroupeEncode = router.url.replace("/details-groupe/:", "");
    this.nomGroupe = decodeURI(nomGroupeEncode);
    this.getInfosGroupe(this.nomGroupe);
   }

  ngOnInit() {
  }

  getInfosGroupe(nomGroupe){
    this.firestore
      .collection('groupes', (ref) => ref.where('nom', '==', nomGroupe))
      .snapshotChanges(['added', 'removed', 'modified'])
      .subscribe((infos) => {
        infos.forEach((info) => {
          // récupération des infos du groupe
          this.admin = info.payload.doc.data()['admin'];
          this.listeGroupe = info.payload.doc.data()['listeGroupe'];
          console.log(this.listeGroupe);
          this.firestore
            .collection('utilisateurs', (ref) => ref.where('uid', '==', this.admin))
            .snapshotChanges(['added', 'removed', 'modified'])
            .subscribe((admins) => {
              admins.forEach((admin) => {
                // récupération du pseudo de l'admin
                this.admin = admin.payload.doc.data()['pseudo'];
              });
            });
        });
      });
  }

  async presentAlertChangementNomGroupePrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Changer le nom du groupe',
      inputs: [
        {
          name: 'NomGroupe',
          type: 'text',
          placeholder: 'Nom du groupe'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Valider',
          handler: (alertData) => {
            console.log('Confirm Ok');
            console.log(alertData.NomGroupe);
            this.changerNomGroupe(alertData.NomGroupe);
          }
        }
      ]
    });
    await alert.present();
  }

  changerNomGroupe(nouveauNomGroupe){

    //changer le nom du groupe dans tous les messages
    this.firestore
      .collection('messages', (ref) => ref.where('nom', '==', encodeURI(this.nomGroupe)))
      .snapshotChanges(['added', 'removed', 'modified'])
      .subscribe((messages) => {
        messages.forEach((message) => {
          // récupération des messages pour pouvoir les update
          var refMsg = message.payload.doc.ref;
          refMsg.update({
            nom: encodeURI(nouveauNomGroupe)
          });
        });
      });

    //changer le nom du groupe
    this.firestore
    .collection('groupes', (ref) => ref.where('nom', '==', this.nomGroupe))
    .snapshotChanges(['added', 'removed', 'modified'])
    .subscribe((groupes) => {
      groupes.forEach((groupe) => {
        // récupération des messages pour pouvoir les update
        console.log(groupe.payload.doc.data())
        var refGrp = groupe.payload.doc.ref;
        refGrp.update({
          nom: nouveauNomGroupe
        });
      });
    });

    this.nomGroupe=nouveauNomGroupe;    

    //créer une alerte pour dire que le nom du groupe a bien été changé et demander à recharger la page
    // redirection vers le nouveau nom du groupe
    this.router.navigateByUrl('details-groupe/:'+this.nomGroupe);
  }

  async presentAlertSuppressionParticipant() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: "Vous ne pouvez pas supprimer d'autres participants.",
      subHeader: 'Il doit rester au minimum 2 participants dans la conversation.',
      buttons: ['OK']
    });

    await alert.present();
  }

  supprimerParticipant(part){
    if (this.listeGroupe.length==2){
      this.presentAlertSuppressionParticipant();
    } else {
      console.log("je souhaite supprimer un participant", part);
      var pos = this.listeGroupe.indexOf(part);
      this.listeGroupe.splice(pos, 1);
      console.log(this.listeGroupe);

      //udpate dans firebase
      /*this.firestore
      .collection('groupes', (ref) => ref.where('nom', '==', this.nomGroupe))
      .snapshotChanges(['added', 'removed', 'modified'])
      .subscribe((groupes) => {
        groupes.forEach((groupe) => {
          // récupération des messages pour pouvoir les update
          console.log(groupe.payload.doc.data())
          var refGrp = groupe.payload.doc.ref;
          refGrp.update({
            listeGroupe: this.listeGroupe
          });
        });
      });*/
    }
  }

  async presentAlertQuitterGroupe() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Vous avez quitté le groupe.',
      subHeader: 'Merci de rafraichir la page.',
      buttons: ['OK']
    });

    await alert.present();
  }

  quitterGroupe(){
    // définir un nouvel administrateur
    
    // suppression du groupe car on gère par les groupes par participants
    this.firestore
    .collection('groupes', (ref) => ref.where('nom', '==', this.nomGroupe))
    .snapshotChanges(['added', 'removed', 'modified'])
    .subscribe((groupes) => {
      groupes.forEach((groupe) => {
        // suppression groupe
        var refGrp = groupe.payload.doc.ref;
        refGrp.delete();
      });
    });

    // suppression des messages associés au groupe sinon quand on recrée un groupe on a les anciens messages
    this.firestore
    .collection('messages', (ref) => ref.where('nom', '==', encodeURI(this.nomGroupe)))
    .snapshotChanges(['added', 'removed', 'modified'])
    .subscribe((messages) => {
      messages.forEach((message) => {
        // récupération des messages pour pouvoir les update
        var refMsg = message.payload.doc.ref;
        refMsg.delete();
      });
    });

    // alerte pour l'utilisateur
    this.presentAlertQuitterGroupe();

    // supprimer l'utilisateur de la liste des participants du groupe
    this.router.navigateByUrl('home/groupe');
  }

  close(){
    this.router.navigateByUrl('home/groupe');
  }

  async presentAlertCheckboxAjouterParticipant() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Checkbox',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Lucie Matthias - @lulu31',
          value: 'Lucie Matthias - @lulu31',
          checked: false,
          handler: (alertData) => {
            if (alertData.checked){
              this.listeGroupe.push("Lucie Matthias - @lulu31");
            }
          }
        },

        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Matthias Laurent - @matha',
          value: 'Matthias Laurent - @matha',
          checked: true,
          handler: (alertData) => {
            if (alertData.checked){
              this.listeGroupe.push("Matthias Laurent - @matha");
            }
          }
        },

        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Maxence Mirens - @maxsens',
          value: 'Maxence Mirens - @maxsens',
          checked: true,
          handler: (alertData) => {
            if (alertData.checked){
              this.listeGroupe.push("Maxence Mirens - @maxsens");
            }
          }
        },

        {
          name: 'checkbox4',
          type: 'checkbox',
          label: 'Mélissa Carillon - @melcarillon',
          value: 'Mélissa Carillon - @melcarillon',
          checked: false,
          handler: (alertData) => {
            if (alertData.checked){
              this.listeGroupe.push("Mélissa Carillon - @melcarillon");
            }
          }
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Valider'
        }
      ]
    });

    await alert.present();
  }
}
