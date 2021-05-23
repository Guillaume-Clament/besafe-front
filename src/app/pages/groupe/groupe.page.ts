import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService, Message } from 'src/app/services/auth.service';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.page.html',
  styleUrls: ['./groupe.page.scss'],
})
export class GroupePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  messages: Observable<Message[]>;
  newMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.messages = this.authService.getChatMessages();
  }

  sendMessage() {
    this.authService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom;
    });
  }
}
