import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer/drawer.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [DrawerComponent, MenuComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [DrawerComponent, MenuComponent]
})
export class SharedComponentsModule { }
