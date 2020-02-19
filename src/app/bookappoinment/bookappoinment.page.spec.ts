import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookappoinmentPage } from './bookappoinment.page';

describe('BookappoinmentPage', () => {
  let component: BookappoinmentPage;
  let fixture: ComponentFixture<BookappoinmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookappoinmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookappoinmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
