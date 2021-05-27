import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(
    private router: Router,
    private alerteCtrl: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async resetPassword(form):Promise<void>{
    this.authService.resetPassword(form.value.email).
    then(
      async () => {
        const alert = await this.alerteCtrl.create({
          message: 'Vérifier votre adresse email pour réinitilisater le mot de passe',
          buttons: [{text:'ok', role:'cancel', handler:()=>{
            this.router.navigateByUrl('login');
          },},],
        });
        await alert.present();
        
      },
      async error => {
        const errorAlert = await this.alerteCtrl.create({
          message: error.message,
          buttons: [{text:'ok', role:'cancel'}],
        });
        await errorAlert.present();
      }
    );
  }

}
