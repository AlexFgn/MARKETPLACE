// src/app/core/services/carrito.service.ts
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto'; // <-- CORRECCIÓN

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items: Producto[] = [];

  agregar(producto: Producto) {
    this.items.push(producto);
  }

  contar(): number {
    return this.items.length;
  }

  getItems(): Producto[] {
    return [...this.items];
  }

  vaciar() {
    this.items = [];
  }
}
