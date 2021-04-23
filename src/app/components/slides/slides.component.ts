import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {
  @ViewChild('mainSlides', { static: true }) slides: IonSlides;

  public onboardSlides = [];
  constructor(private router: Router) {}

  skip() {
    this.router.navigate(['/login']);
  }

  goNext() {
    this.slides.slideNext();
  }

  goBack() {
    this.slides.slidePrev();
  }

  ngOnInit() {
    this.onboardSlides = [
      {
        title: 'Titre 1',
        img: 'Functionalities',
        desc:
          'Retrouvez au même endroit toutes les fonctionnalités dont vous avez besoin lorsque vous sortez.',
      },
      {
        title: 'Titre 2',
        img: 'Security',
        desc: 'Cherchez un itinéraire et atteignez-le en toute sécurité !',
      },
      {
        title: 'Titre 3',
        img: 'Location',
        desc: 'Lancez votre trajet et partagez-le avec vos proches.',
      },
      {
        title: 'Titre 4',
        img: 'Together',
        desc: 'Pour vous et pour eux.',
      },
    ];
  }
}