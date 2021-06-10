import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GestureController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NavParamService } from 'src/app/services/navparam.service';
import {
  Plugins,
  CameraResultType,
  CameraSource,
  CameraDirection,
} from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const MEDIA_FOLDER_NAME = 'my_media';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements AfterViewInit {
  @ViewChild('drawer', { read: ElementRef }) drawer: ElementRef;
  @Output('openStateChanged') openState: EventEmitter<boolean> =
    new EventEmitter();
  currentUid: string = '';
  isOpen = false;
  openHeight = 0;
  photo: SafeResourceUrl;
  //num à changer
  phoneNumber = '0649279659';
  estEnregistre: boolean = false;
  
  constructor(
    private plt: Platform,
    private router: Router,
    private gestureCtrl: GestureController,
    private firestore: AngularFirestore,
    private navService: NavParamService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.currentUid = this.authService.currentUser.uid;
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
        if (ev.deltaY > 200) this.router.navigateByUrl('fin-alerte');
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

  emettreAlerte() {
    this.firestore.collection('trajet-alerte').add({
      user: this.authService.currentUser.uid,
      heure: '' + new Date().toISOString(),
      localisation: '' + this.navService.geoNavGeo(),
    });
  }

  appelerNumero(){
    this.emettreAlerte();
    console.log('appel');
    window.open(`tel:${this.phoneNumber}`, '_system');
  }

  enregistrerAudio(){
    this.emettreAlerte();
    window.AudioContext = window.AudioContext;
    const context = new AudioContext();
    this.estEnregistre = true;
    setTimeout( () => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const microphone = context.createMediaStreamSource(stream);
      const filter = context.createBiquadFilter();
      microphone.connect(filter);
      filter.connect(context.destination)})}, 1000);
  }
  
  async ouvrirCamera() {
    this.emettreAlerte();
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      direction: CameraDirection.Front,
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
  }
}
