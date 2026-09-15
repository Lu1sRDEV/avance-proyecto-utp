import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Alumno {
  alu_id?: number; // El signo "?" permite que sea opcional al matricular (autoincremental)
  alu_codigo: string;
  alu_dni: string;
  alu_nombres: string;
  alu_apellidos: string;
  alu_carrera: string;
  alu_correo: string;
  alu_fecha_ingreso?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/alumnos'; 

  obtenerTodos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  // REQUISITO REGISTRO: Debe llamarse exactamente igual a como lo usas en el componente
  matricularAlumno(alumno: Alumno): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/matricular`, alumno);
  }

  actualizar(id: number, alumno: Alumno): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, alumno);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
