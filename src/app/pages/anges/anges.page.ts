import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";


export interface Anges {
  prenom: String,
  pseudo: String,
  image: String
}
@Component({
  selector: "app-anges",
  templateUrl: "./anges.page.html",
  styleUrls: ["./anges.page.scss"],
})

export class AngesPage implements OnInit {
  veutModifier = false;
  anges: Anges[] = [
    {
      prenom: "Sirine",
      pseudo: "sisi",
      image: "http://placekitten.com/200/300"
    },{
      prenom: "Camille",
      pseudo: "cam",
      image: "http://placekitten.com/300/300"
    },{
      prenom: "Valentin",
      pseudo: "valou",
      image: "http://placekitten.com/400/300"
    },{
      prenom: "Guillaume",
      pseudo: "guigui",
      image: "http://placekitten.com/300/300"
    },{
      prenom: "Flore",
      pseudo: "flo",
      image: "http://placekitten.com/300/200"
    },{
      prenom: "Ali",
      pseudo: "ali",
      image: "http://placekitten.com/200/200"
    }
  ]
  newPseudo: String;
  
  constructor(
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async ajouterAnge() {
    let alert = this.alertController.create({
      //title: 'Confirm purchase',
      message: "Veuillez saisir le pseudo de l'ange recherché",
      inputs: [
        {
          name: 'reponse'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Valider',
          handler: data => {
            var newUser: Anges;
            newUser = {
              pseudo: data.reponse,
              prenom: "Test",
              image: "http://placekitten.com/500/300"
            }
            this.anges.push(newUser);
          }
        }
      ]
    });
    (await alert).present();
    
  }

  modifier(){
    if (this.veutModifier == false){
      this.veutModifier = true;
    } else {
      this.veutModifier = false;
    }
  }

  supprimer(user){
    this.anges.forEach((data, index)=>{
      if (data == user){
        this.anges.splice(index, 1);
      }
    })
  }
}
