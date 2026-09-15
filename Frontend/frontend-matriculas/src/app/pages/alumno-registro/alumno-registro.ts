import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnoService } from '../../service/alumno';
import { Alumno } from '../../Model/alumno.model';

@Component({
  selector: 'app-alumno-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alumno-registro.html',
  styleUrl: './alumno-registro.css'
})
export class AlumnoRegistroComponent implements OnInit{
  // Inyección de servicios (Conexión al backend y enrutador de páginas)
  private alumnoService = inject(AlumnoService);
  private router = inject(Router);

  // 1. SIGNAL PARA LOS DATOS DEL ALUMNO (Vinculado a los [(ngModel)] del HTML)
  alumno = signal<Alumno>({
    alu_codigo: '',
    alu_dni: '',
    alu_nombres: '',
    alu_apellidos: '',
    alu_carrera: '',
    alu_correo: ''
  });

  // 2. SIGNAL PARA ERRORES (Muestra el aviso rojo si el DNI ya existe en MySQL)
  mensajeError = signal<string | null>(null);

  ngOnInit(): void {
    
  }

  // 3. FUNCIÓN GUARDAR() -> Se activa al hacer submit en el formulario
  guardar(): void {
    this.mensajeError.set(null); // Limpiamos errores previos

    this.alumnoService.matricularAlumno(this.alumno()).subscribe({
      next: (respuesta) => {
        console.log('Matrícula exitosa:', respuesta);
        // Redirecciona al padrón general de alumnos tras guardar
        this.router.navigate(['/personas'])
      },
      error: (err) => {
        // Captura el estado 400 que programamos en el Backend para DNI duplicado
        if (err.status === 400) {
          this.mensajeError.set(err.error.error);
        } else {
          this.mensajeError.set('Ocurrió un error inesperado en el servidor.');
        }
      }
    });
  }

  // 4. FUNCIÓN CANCELAR() -> Devuelve al usuario a la lista sin guardar
  cancelar(): void {
    this.router.navigate(['/personas'])
  }
}
