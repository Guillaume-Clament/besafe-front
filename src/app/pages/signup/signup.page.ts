import { Component, ContentChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  showPassword = false;
  @ContentChild(IonInput) input: IonInput;
  passwordToggleIcon = 'eye';

  constructor(
    private pickerCtrl: PickerController,
    private router: Router,
    private alerteCtrl: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async signUp(form): Promise<void> {
    this.authService
      .signUpUser({
        pseudo: form.value.pseudo,
        email: form.value.email,
        nom: form.value.nom,
        prenom: form.value.prenom,
        password: form.value.password,
        dateNaissance: form.value.dateNaissance,
      })
      .then(
        () => {
          this.router.navigateByUrl('home/carte');
        },
        async (error) => {
          const alert = await this.alerteCtrl.create({
            message: error.message,
            buttons: [{ text: 'ok', role: 'cancel' }],
          });
          await alert.present();
        }
      );
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }
}
