import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService, Message } from 'src/app/services/chat.service';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.page.html',
  styleUrls: ['./groupe.page.scss'],
})
export class GroupePage implements OnInit {
  groupes = [];
  messages: Observable<Message[]>;
  date: Date;
  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    private chatService: ChatService
  ) {
    this.getGroupes();
    this.groupes=[];
  }

  ngOnInit(){

  }

  onClick() {
    this.router.navigate(['/discussion/:id']);
  }

  getGroupes() {
    this.firestore
      .collection('groupes')
      .snapshotChanges(['added', 'removed', 'modified'])
      .subscribe((groupes) => {
        groupes.forEach((groupe) => {
          // récupération du dernier message
          var nomGroupe = groupe.payload.doc.data()['nom'];
          var dernierMessage = 'Nouveau groupe !';
          var dateDernierMessage = 0;
          this.messages = this.chatService.getChatMessages();
          this.messages.forEach((message) => {
            message.forEach((m) => {
              //console.log(m.createdAt);
              if (m.createdAt!=null && m.nom == encodeURI(nomGroupe) && m.createdAt['seconds']>dateDernierMessage) {
                dateDernierMessage = m.createdAt['seconds'];
                dernierMessage = m.msg;
                this.date = new Date(m.createdAt['seconds'] * 1000);
              }
            });
            this.groupes.push({
              id: groupe.payload.doc.id,
              photo: groupe.payload.doc.data()['photo'],
              nom: groupe.payload.doc.data()['nom'],
              derniermessage: dernierMessage,
              dateEnvoie: this.date.toLocaleString(),
            });
          });
        });
      });
  }

  goToDiscussion(nomGroupe: String) {
    this.router.navigateByUrl('discussion/:'+nomGroupe);
  }

  creerGroupe() {
    this.router.navigateByUrl('add-groupe');
  }
}
