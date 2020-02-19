import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateBarberProfilePage } from './update-barber-profile.page';

describe('UpdateBarberProfilePage', () => {
  let component: UpdateBarberProfilePage;
  let fixture: ComponentFixture<UpdateBarberProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBarberProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateBarberProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
