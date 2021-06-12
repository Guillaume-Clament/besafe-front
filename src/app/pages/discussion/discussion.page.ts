import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService, Message } from 'src/app/services/chat.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.page.html',
  styleUrls: ['./discussion.page.scss'],
})
export class DiscussionPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  test: Observable<any>;
  messages: Observable<Message[]>;
  newMsg = '';
  nomGroupe = '';
  constructor(private router: Router, 
    private chatService: ChatService, 
    private firestore: AngularFirestore) {
      this.nomGroupe = router.url.replace("/discussion/:", "");

  }

  ngOnInit() {
    this.messages = this.chatService.getChatMessagesByGroupe(this.nomGroupe);
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg, this.nomGroupe).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom;
    });
  }
}
