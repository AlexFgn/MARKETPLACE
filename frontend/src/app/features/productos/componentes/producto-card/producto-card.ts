import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../../core/services/carrito.service';
import { Producto } from '../../../../core/models/producto';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-card.html',
  styleUrls: ['./producto-card.css']
})
export class ProductoCardComponent {
  @Input() producto!: Producto;
  mostrarMiniCarrito = false;

  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregar(producto);
    window.dispatchEvent(new CustomEvent('carrito:refresh'));
    this.mostrarMiniCarrito = true;
    setTimeout(() => (this.mostrarMiniCarrito = false), 4000);
  }
}
