import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-add-groupe',
  templateUrl: './add-groupe.page.html',
  styleUrls: ['./add-groupe.page.scss'],
})
export class AddGroupePage implements OnInit {
  public membres = [];
  @Input() membreGroupe: string;

  constructor(
    private router: Router,
    public firestore: AngularFirestore,
    public alertController: AlertController,
    private authService: AuthService) { }

  ngOnInit() {
  }

  addMembre(){
    this.membres.push(this.membreGroupe);
    this.membreGroupe = '';
  }

  creerGroupe(form){
    if (this.membres.length == 0){
      this.presentAlert('Vous devez ajouter au moins un membre avant de créer un groupe.');
    } else {
      this.firestore.collection('groupes').add({
        nom: form.value.nomGroupe,
        listeGroupe: this.membres
      });
      this.firestore.collection('messages').add({
        msg: "Création d'un nouveau groupe !",
        from: this.authService.currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        nom: encodeURI(form.value.nomGroupe),
      });
      this.presentAlert('Vous venez de créer un nouveau groupe.');
      this.router.navigateByUrl('discussion/:'+form.value.nomGroupe);
    }    
  }

  openImagePicker(){
    console.log("Je souhaite ajouter une image");
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: message,
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  /*
  
  imports à faire :
  import { normalizeURL } from 'ionic-angular';
  import * as firebase from 'firebase';


  uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      var storage = firebase.default.storage();
      let storageRef = storage.ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  }

  openImagePicker(){
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if(result == false){
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if(result == true){
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.uploadImageToFirebase(results[i]);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
    }

    uploadImageToFirebase(image){
      image = normalizeURL(image);
    
      //uploads img to firebase storage
      this.uploadImage(image)
      .then(photoURL => {
        this.presentAlert();
        })
      }

      async presentAlert() {
        const alert = await this.toastCtrl.create({
        message: 'Image was updated successfully',
          duration: 3000
       });
       await alert.present(); 
    }
    */

}
