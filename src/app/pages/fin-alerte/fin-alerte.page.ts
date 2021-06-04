import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fin-alerte',
  templateUrl: './fin-alerte.page.html',
  styleUrls: ['./fin-alerte.page.scss'],
})
export class FinAlertePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToCarte(){
    this.router.navigateByUrl('carte');
  }

  goToValidation(){
    this.router.navigateByUrl('validation-trajet');
  }

}
