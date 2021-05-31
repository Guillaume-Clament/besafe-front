import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from 'src/app/services/chat.service';
import { AuthService, User, FirebaseUser } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {
  currentEmail: string = '';
  currentPseudo: string = '';
  currentUid: string = '';
  users: Observable<FirebaseUser[]>;
  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {
    this.currentUid = this.authService.currentUser.uid;
    this.currentEmail = this.authService.getEmail();
    this.users = this.authService.getFireUsers();
  }

  ngOnInit() {}
}
