import { Component, ContentChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

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
    private alerteCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  signUp(email, password){
    
  }

  togglePassword(): void{
    this.showPassword = !this.showPassword;

    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }
}
