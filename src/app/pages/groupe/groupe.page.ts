import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService, Message } from 'src/app/services/chat.service';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.page.html',
  styleUrls: ['./groupe.page.scss'],
})
export class GroupePage implements OnInit {
  groupes = [];
  constructor(private router: Router, public firestore: AngularFirestore) {
    this.getGroupes();
  }

  ngOnInit() { }

  onClick() {
    this.router.navigate(['/discussion']);
  }

  getGroupes() {
    this.firestore.collection('groupes').snapshotChanges(['added', 'removed', 'modified']).subscribe(groupes => {
      groupes.forEach(groupe => {
        // récupération du dernier message
        var listeMessages = groupe.payload.doc.data()['listeMessages'];
        var dernierMessage = "Nouveau groupe !";
        if (listeMessages) {
          /*console.log(listeMessages[listeMessages.length-1].id);
          var refMessage = this.firestore.collection('messages').doc(listeMessages[listeMessages.length-1].id);
          
          var docRef = this.firestore.collection("messages").doc(refMessage.toString());
          docRef.get().then((doc) => {
              if (doc.exists) {
                  console.log("Document data:", doc.data());
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch((error) => {
              console.log("Error getting document:", error);
          });

          console.log(refMessage2);*/
          dernierMessage = listeMessages[listeMessages.length-1].id;
        }

        this.groupes.push({
          id: groupe.payload.doc.id,
          photo: groupe.payload.doc.data()['photo'],
          nom: groupe.payload.doc.data()['nom'],
          derniermessage: dernierMessage          
        })
      });
    });
  }

  goToDiscussion(idgroupe: any) {
    //this.router.navigate(['/discussion/']);
    //this.router.navigateByUrl('discussion/'+idgroupe.id);


  }
}
