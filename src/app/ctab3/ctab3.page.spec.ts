import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Ctab3Page } from './ctab3.page';

describe('Ctab3Page', () => {
  let component: Ctab3Page;
  let fixture: ComponentFixture<Ctab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ctab3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Ctab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
