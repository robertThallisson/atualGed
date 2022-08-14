import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfiguracaoCertificadoPage } from './configuracao-certificado.page';

describe('ConfiguracaoCertificadoPage', () => {
  let component: ConfiguracaoCertificadoPage;
  let fixture: ComponentFixture<ConfiguracaoCertificadoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoCertificadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoCertificadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
