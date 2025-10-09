import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items: Producto[] = [];

  agregar(producto: Producto) {
    this.items.push(producto);
  }

  getItems(): Producto[] {
    return this.items.slice();
  }

  contar(): number {
    return this.items.length;
  }

  eliminar(producto: Producto) {
    const index = this.items.findIndex(p => {
      const pid = (p as any).id;
      const qid = (producto as any).id;
      if (pid !== undefined && qid !== undefined) {
        return pid === qid;
      }
      return p === producto;
    });

    if (index !== -1) {
      this.items.splice(index, 1);
    }

    console.log('[CarritoService] eliminar uno', producto, this.items);
  }

  vaciar() {
    this.items = [];
  }

  calcularTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.precio || 0), 0);
  }
}
