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

  constructor() { }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }

  skip() {
    this.slides.slideNext();
  }
}