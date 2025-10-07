import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../features/productos/services/productos/productos';
import { CarritoService } from '../../../core/services/carrito.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  query = '';
  cantidadCarrito = 0;

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) {}

  buscar() {
    const event = new CustomEvent('app-search', { detail: { q: this.query } });
    window.dispatchEvent(event);
  }

  ngDoCheck() {
    this.cantidadCarrito = this.carritoService.contar();
  }
}
