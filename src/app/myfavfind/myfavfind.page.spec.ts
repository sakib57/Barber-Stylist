import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyfavfindPage } from './myfavfind.page';

describe('MyfavfindPage', () => {
  let component: MyfavfindPage;
  let fixture: ComponentFixture<MyfavfindPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfavfindPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyfavfindPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
