import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnoListaComponent } from './alumno-lista';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AlumnoListaComponent', () => {
  let component: AlumnoListaComponent;
  let fixture: ComponentFixture<AlumnoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoListaComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlumnoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
