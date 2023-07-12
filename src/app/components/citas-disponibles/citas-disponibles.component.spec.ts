import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasDisponiblesComponent } from './citas-disponibles.component';

describe('CitasDisponiblesComponent', () => {
  let component: CitasDisponiblesComponent;
  let fixture: ComponentFixture<CitasDisponiblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitasDisponiblesComponent]
    });
    fixture = TestBed.createComponent(CitasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
