import { Component, OnInit, inject } from '@angular/core'; // Corregido: inject viene de @angular/core
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  // Inyección de dependencias correcta para Angular moderno
  private router = inject(Router);

  ngOnInit(): void {
    // Aquí puedes cargar datos iniciales si lo necesitas más adelante
  }

  Cerrarsesion(): void {
    // Remueve tokens o datos de sesión aquí si manejas LocalStorage (ej: localStorage.clear();)
    this.router.navigate(['/login']); // Cambiado a '/login' para apuntar directo a tu ruta de acceso
  }
}
