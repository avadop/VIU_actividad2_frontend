import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasAltaComponent } from './mascotas-alta.component';

describe('MascotasAltaComponent', () => {
  let component: MascotasAltaComponent;
  let fixture: ComponentFixture<MascotasAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MascotasAltaComponent]
    });
    fixture = TestBed.createComponent(MascotasAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
