// src/app/app.ts
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './shared/components/header/header';
import { ProductosListaComponent } from './features/productos/pages/productos-lista/productos-lista';
import { FooterComponent } from './shared/components/footer/footer'; // <-- IMPORTAR footer

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    ProductosListaComponent,
    FooterComponent // <-- AÑADIR footer aquí
  ],
  template: `
    <app-header></app-header>

    <main style="padding: 20px;">
      <app-productos-lista></app-productos-lista>
    </main>

    <!-- Footer añadido al final de la plantilla -->
    <app-footer></app-footer>
  `
})
export class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule)
  ]
}).catch(err => console.error(err));
