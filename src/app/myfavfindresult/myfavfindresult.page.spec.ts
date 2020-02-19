import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyfavfindresultPage } from './myfavfindresult.page';

describe('MyfavfindresultPage', () => {
  let component: MyfavfindresultPage;
  let fixture: ComponentFixture<MyfavfindresultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfavfindresultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyfavfindresultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
