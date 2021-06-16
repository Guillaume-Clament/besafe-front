import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from 'src/app/services/chat.service';
import { AuthService, User, FirebaseUser } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private router: Router,
    public alertController: AlertController,
    private navCtrl: NavController
  ) {
    this.currentUid = this.authService.currentUser.uid;
    this.currentEmail = this.authService.getEmail();
    this.users = this.authService.getFireUsers();
  }

  ngOnInit() {
    if (document.body.getAttribute('color-theme') == 'dark') {
      document.getElementById('themeToggle').setAttribute('checked', 'true');
    }
  }

  themeToggle(event) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }

  logOut() {
    this.authService.logOutUser();
    this.router.navigate(['/login']);
  }

  alerte() {
    this.router.navigate(['home/compte/alerte']);
  }

  anges() {
    this.router.navigate(['home/compte/anges']);
  }

  domicile() {
    this.router.navigate(['home/compte/domicile']);
  }

  raccourcis(){
    this.router.navigate(['home/compte/raccourcis']);
  }

  async afficherInfos() {
    let alert = this.alertController.create({
      //title: 'Confirm purchase',
      message: '<h3> Vos informations : </h3> <br> Nom : XXX <br> Prénom : XXX  <br> Adresse mail : ' + this.currentEmail,
      buttons: [
        {
          text: 'Retour',
          role: 'cancel'
        },
      ]
    });
    (await alert).present();
  }

  
}
