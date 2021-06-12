import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-secrete',
  templateUrl: './question-secrete.page.html',
  styleUrls: ['./question-secrete.page.scss'],
})
export class QuestionSecretePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToCarte(){
    this.router.navigateByUrl('home/carte');
  }
}
