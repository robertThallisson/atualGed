import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataModalPage } from './data-modal.page';

describe('DataModalPage', () => {
  let component: DataModalPage;
  let fixture: ComponentFixture<DataModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
