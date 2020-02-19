import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PassRecoverPage } from './pass-recover.page';

describe('PassRecoverPage', () => {
  let component: PassRecoverPage;
  let fixture: ComponentFixture<PassRecoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassRecoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PassRecoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
