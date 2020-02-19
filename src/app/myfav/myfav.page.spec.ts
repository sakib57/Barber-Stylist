import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyfavPage } from './myfav.page';

describe('MyfavPage', () => {
  let component: MyfavPage;
  let fixture: ComponentFixture<MyfavPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfavPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyfavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
