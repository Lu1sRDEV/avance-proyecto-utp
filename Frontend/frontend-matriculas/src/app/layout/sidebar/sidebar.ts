import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  nombreUsuario: string = 'Secretario(a)'; // Valor por defecto por seguridad

  ngOnInit() {
    const usuarioLogueado = sessionStorage.getItem('usuarioActivo');
    if (usuarioLogueado) {
      this.nombreUsuario = usuarioLogueado;
    }
  }
}
