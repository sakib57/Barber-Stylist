import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CsettingPage } from './csetting.page';

describe('CsettingPage', () => {
  let component: CsettingPage;
  let fixture: ComponentFixture<CsettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CsettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
