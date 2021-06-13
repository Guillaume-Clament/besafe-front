import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer/drawer.component';
import { IonicModule } from '@ionic/angular';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    DrawerComponent, 
    EditComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    DrawerComponent, 
    EditComponent
  ]
})
export class SharedComponentsModule { }
