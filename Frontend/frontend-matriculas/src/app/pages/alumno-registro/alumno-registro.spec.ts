import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoRegistroComponent } from './alumno-registro';

describe('AlumnoRegistro', () => {
  let component: AlumnoRegistroComponent;
  let fixture: ComponentFixture<AlumnoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoRegistroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlumnoRegistroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
