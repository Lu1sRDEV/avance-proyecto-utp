import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// 1. Importar las herramientas de formularios reactivos
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  // 2. Agregar ReactiveFormsModule a los imports
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  // 3. Declarar la propiedad del formulario
  loginForm!: FormGroup;

  // VARIABLE NUEVA: Controla si la contraseña está oculta o visible
  ocultarPassword = true;

  ngOnInit(): void {
    // 4. Inicializar el formulario con sus validaciones y límites de caracteres
    this.loginForm = this.fb.group({
      usuario: ['', [
        Validators.required,
        Validators.maxLength(20) // Máximo 20 caracteres
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8) // Mínimo 8 caracteres
      ]]
    });
  }

  // VARIABLE NUEVA: Controla la visibilidad del mensaje de error general
  mostrarErrorCredenciales = false;

  // MÉTODO NUEVO: Invierte el estado de la variable (true <-> false)
  conmutarPassword(): void {
    this.ocultarPassword = !this.ocultarPassword;
  }

  iraSesion() {
    if (this.loginForm.valid) {
      this.mostrarErrorCredenciales = false; // Limpiamos errores previos si los hubiera
      
      const usuarioIngresado = this.loginForm.get('usuario')?.value;
      // Guardamos el nombre en la sesión del navegador
      sessionStorage.setItem('usuarioActivo', usuarioIngresado);
      
      // SOLUCIÓN: Agregamos la redirección real hacia el layout del sistema
      this.router.navigate(['/personas']); 
      
    } else {
      // Si el formulario tiene campos vacíos o inválidos, los resalta visualmente
      this.loginForm.markAllAsTouched();
    }
  }
}
