import { Component, OnInit } from '@angular/core';
import { NavParamService } from 'src/app/services/navparam.service';

@Component({
  selector: 'app-domicile',
  templateUrl: './domicile.page.html',
  styleUrls: ['./domicile.page.scss'],
})
export class DomicilePage implements OnInit {
  afficherDrawer = false;
  backdropVisible = false;

  constructor(
    private navService: NavParamService
  ) { }

  ngOnInit() {
  }

  modifierAdresse(){
    this.afficherDrawer = true;
  }
  
  /**
   * Effet de style quand le drawer est tiré
   */
   toggleBackdrop(isVisible) {
    this.backdropVisible = isVisible;
    console.log(this.navService.getAdresse());
  }
}
