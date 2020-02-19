import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateServicePage } from './create-service.page';

describe('CreateServicePage', () => {
  let component: CreateServicePage;
  let fixture: ComponentFixture<CreateServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
