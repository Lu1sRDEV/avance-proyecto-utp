import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnoService } from '../../service/alumno';
import { Alumno } from '../../Model/alumno.model';// Ajusta la ruta de tu servicio

@Component({
  selector: 'app-alumno-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './alumno-lista.html',
  styleUrl: './alumno-lista.css'
})
export class AlumnoListaComponent implements OnInit {
  private alumnoService = inject(AlumnoService);
  private router = inject(Router);

  // La lista ahora inicia vacía esperando los datos reales de la BD
  listaAlumnos = signal<Alumno[]>([]);
  idEditando = signal<number | null>(null);

  // Clon temporal para restaurar los datos si el usuario cancela la edición
  private alumnoRespaldo: Alumno | null = null;

  // 1. Señal para capturar la carrera seleccionada en el combo box
  filtroCarrera = signal<string>('');

  // 2. Propiedad computada inteligente que filtra de forma reactiva en tiempo real
  listaAlumnosFiltrados = computed(() => {
    const carreraSeleccionada = this.filtroCarrera();

    // Si la opción seleccionada es vacía (Todas las carreras), devolvemos la lista completa
    if (!carreraSeleccionada) {
      return this.listaAlumnos();
    }

    // Filtramos la lista original comparando la carrera
    return this.listaAlumnos().filter(alumno => alumno.alu_carrera === carreraSeleccionada);
  });


  ngOnInit(): void {
    this.cargarAlumnosDesdeBD();
  }

  // Función para consumir el servicio de lectura (READ)
  cargarAlumnosDesdeBD(): void {
    this.alumnoService.obtenerTodos().subscribe({
      next: (data) => this.listaAlumnos.set(data),
      error: (err) => console.error('Error al conectar con Node.js y la BD:', err)
    });
  }

  irARegistro(): void {
    this.router.navigate(['/insertar'])
  }

  iniciarEdicion(alumno: Alumno): void {
    if (alumno.alu_id !== undefined) {
      this.idEditando.set(alumno.alu_id);
      this.alumnoRespaldo = { ...alumno };
    }
  }

  // Función para consumir el servicio de actualización (UPDATE)
  guardarEdicion(alumnoModificado: Alumno): void {
    const id = alumnoModificado.alu_id;
    if (id !== undefined) {
      this.alumnoService.actualizar(id, alumnoModificado).subscribe({
        next: (alumnoActualizado) => {
          console.log('Cambios impactados en la BD con éxito:', alumnoActualizado);
          this.idEditando.set(null);
          this.alumnoRespaldo = null;
        },
        error: (err: any) => {
          alert('No se pudieron guardar los cambios en la BD.');
          console.error(err);
        }
      });
    }
  }


  cancelarEdicion(indexFila: number): void {
    // Si cancela, devolvemos los valores originales al estado de la tabla
    if (this.alumnoRespaldo) {
      this.listaAlumnos.update(alumnos => {
        alumnos[indexFila] = this.alumnoRespaldo!;
        return [...alumnos];
      });
    }
    this.idEditando.set(null);
    this.alumnoRespaldo = null;
  }

  // Función para consumir el servicio de eliminación (DELETE)
  eliminarAlumno(id: number | undefined): void {
    if (id === undefined) return; // Detiene la función si no hay ID válida

    if (confirm('¿Estás seguro de eliminar este alumno permanentemente de la Base de Datos?')) {
      this.alumnoService.eliminar(id).subscribe({
        next: () => {
          this.listaAlumnos.update(alumnos => alumnos.filter(a => a.alu_id !== id));
        },
        error: (err: any) => {
          alert('No se pudo eliminar al alumno.');
          console.error(err);
        }
      });
    }
  }
}





