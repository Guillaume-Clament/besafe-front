import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RaccourcisPage } from './raccourcis.page';

describe('RaccourcisPage', () => {
  let component: RaccourcisPage;
  let fixture: ComponentFixture<RaccourcisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaccourcisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RaccourcisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
