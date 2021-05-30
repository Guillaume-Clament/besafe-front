import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService, Message } from 'src/app/services/chat.service';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.page.html',
  styleUrls: ['./groupe.page.scss'],
})
export class GroupePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onClick() {
    this.router.navigate(['/discussion']);
  }
}
