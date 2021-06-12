import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-secret',
  templateUrl: './code-secret.page.html',
  styleUrls: ['./code-secret.page.scss'],
})
export class CodeSecretPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToCarte(){
    this.router.navigateByUrl('home/carte');
  }

}
