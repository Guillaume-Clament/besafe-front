import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private alerteCtrl: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async login(form):Promise<void>{
    this.authService.loginUser(form.value.email, form.value.password)
    .then(
      () => {
        this.router.navigateByUrl('home/carte');
      },
      async error => {
        const alert = await this.alerteCtrl.create({
          message: error.message,
          buttons: [{text:'ok', role:'cancel'}],
        });
        await alert.present();
      }
    );
  }

  goToReset(){
    this.router.navigateByUrl('password-reset');
  }

}
