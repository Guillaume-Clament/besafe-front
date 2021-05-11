import { Component, ContentChild, OnInit } from '@angular/core';
import { IonInput, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  showPassword = false;
  @ContentChild(IonInput) input: IonInput;

  constructor(
    private pickerCtrl: PickerController
  ) { }

  ngOnInit() {
  }

  signUp(){

  }

}
