import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarberCngPassPage } from './barber-cng-pass.page';

describe('BarberCngPassPage', () => {
  let component: BarberCngPassPage;
  let fixture: ComponentFixture<BarberCngPassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarberCngPassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarberCngPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
