import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PassResetCodePage } from './pass-reset-code.page';

describe('PassResetCodePage', () => {
  let component: PassResetCodePage;
  let fixture: ComponentFixture<PassResetCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassResetCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PassResetCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
