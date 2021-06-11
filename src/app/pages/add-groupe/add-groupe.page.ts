import { Component, OnInit } from '@angular/core';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-add-groupe',
  templateUrl: './add-groupe.page.html',
  styleUrls: ['./add-groupe.page.scss'],
})
export class AddGroupePage implements OnInit {

  constructor(public afDB: AngularFireDatabase,
    public afSG: AngularFireStorage, public imagePicker: ImagePicker) { }

  ngOnInit() {
  }

  pickImages(){
    let options: ImagePickerOptions = {
      maximumImagesCount: 1
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

  signUp(form){
    // TODO
  }

}
