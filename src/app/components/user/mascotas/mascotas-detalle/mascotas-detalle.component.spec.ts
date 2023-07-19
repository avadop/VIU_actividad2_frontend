import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasDetalleComponent } from './mascotas-detalle.component';

describe('MascotasDetalleComponent', () => {
  let component: MascotasDetalleComponent;
  let fixture: ComponentFixture<MascotasDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MascotasDetalleComponent]
    });
    fixture = TestBed.createComponent(MascotasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
