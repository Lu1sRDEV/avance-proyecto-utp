import { Routes } from '@angular/router';
import { AlumnoListaComponent } from './pages/alumno-lista/alumno-lista';
import { AlumnoRegistroComponent } from './pages/alumno-registro/alumno-registro';
import { Login } from './pages/login/login';
import { Layout } from './layout/layout';

export const routes: Routes = [
  // Fuera del Layout (Pantalla completa para el acceso)
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  // Dentro del Layout (Mantienen el menú lateral visible a la izquierda)
  {
    path: '',
    component: Layout,
    children: [
      { path: 'personas', component: AlumnoListaComponent },    // Enlace: Alumnos (/personas)
      { path: 'insertar', component: AlumnoRegistroComponent }  // Enlace: Registrar Alumno (/insertar)
    ]
  },

  // Redirección de seguridad para URLs no existentes
  { path: '**', redirectTo: 'login' }
];