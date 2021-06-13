import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
  AfterViewInit,
  Input,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GestureController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NavParamService } from 'src/app/services/navparam.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements AfterViewInit {
  @ViewChild('edit', { read: ElementRef }) drawer: ElementRef;
  @Output('openStateChanged') openState: EventEmitter<boolean> =
    new EventEmitter();
  isOpen = false;
  openHeight = 0;
  @Input() newAdresse: string;

  constructor(
    private plt: Platform,
    private router: Router,
    private gestureCtrl: GestureController,
    private navService: NavParamService
  ) {

  }

  async ngAfterViewInit() {
    const drawer = this.drawer.nativeElement;
    this.openHeight = (this.plt.height() / 100) * 70;

    const gesture = await this.gestureCtrl.create({
      el: drawer,
      gestureName: 'swipe',
      direction: 'y',
      onMove: (ev) => {
        console.log(ev);
        if (ev.deltaY < -this.openHeight) return;
        drawer.style.transform = `translateY(${ev.deltaY}px)`;
      },
      onEnd: (ev) => {
        if (ev.deltaY < -50 && this.isOpen) {
          drawer.style.transition = '.4s ease-out';
          drawer.style.transform = `translateY(${-this.openHeight}px)`;
          this.openState.emit(true);
          this.isOpen = true;
        } else if (ev.deltaY > 50 && this.isOpen) {
          drawer.style.transition = '.4s ease-out';
          drawer.style.transform = '';
          this.openState.emit(false);
          this.isOpen = false;
        }
      },
    });
    gesture.enable(true);
  }

  toggleDrawer() {
    const drawer = this.drawer.nativeElement;
    this.openState.emit(!this.isOpen);
    if (!this.isOpen) {
      drawer.style.transition = '.4s ease-out';
      drawer.style.transform = '';
      this.isOpen = false;
    } else {
      drawer.style.transition = '.4s ease-out';
      drawer.style.transform = `translateY(${-this.openHeight}px)`;
      this.isOpen = true;
    }
  }

  setNewAdresse(){
    this.navService.setAdresse(this.newAdresse);
  }
}
