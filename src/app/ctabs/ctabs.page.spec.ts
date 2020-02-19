import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CtabsPage } from './ctabs.page';

describe('CtabsPage', () => {
  let component: CtabsPage;
  let fixture: ComponentFixture<CtabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CtabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
