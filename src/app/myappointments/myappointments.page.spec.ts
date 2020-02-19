import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyappointmentsPage } from './myappointments.page';

describe('MyappointmentsPage', () => {
  let component: MyappointmentsPage;
  let fixture: ComponentFixture<MyappointmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyappointmentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyappointmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
