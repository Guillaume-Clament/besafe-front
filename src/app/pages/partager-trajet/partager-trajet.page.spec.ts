import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartagerTrajetPage } from './partager-trajet.page';

describe('PartagerTrajetPage', () => {
  let component: PartagerTrajetPage;
  let fixture: ComponentFixture<PartagerTrajetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartagerTrajetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartagerTrajetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
