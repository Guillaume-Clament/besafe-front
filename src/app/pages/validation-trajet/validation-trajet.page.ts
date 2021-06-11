import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation-trajet',
  templateUrl: './validation-trajet.page.html',
  styleUrls: ['./validation-trajet.page.scss'],
})
export class ValidationTrajetPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToQuestion(){
    this.router.navigateByUrl('question-secrete');
  }

  goToCode(){
    this.router.navigateByUrl('code-secret');
  }

}
