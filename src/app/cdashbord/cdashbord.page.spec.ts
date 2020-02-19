import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CdashbordPage } from './cdashbord.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
describe('CdashbordPage', () => {
  let component: CdashbordPage;
  let fixture: ComponentFixture<CdashbordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdashbordPage ],
      imports: [IonicModule.forRoot(),FontAwesomeModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CdashbordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
