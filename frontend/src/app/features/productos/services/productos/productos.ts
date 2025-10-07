import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  titulo: string;
  precio: number;
  img: string;
  condicion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productos: Producto[] = [
    { id: 1, titulo: 'Reloj antiguo', precio: 120, img: 'https://picsum.photos/200/300', condicion: 'Original' },
    { id: 2, titulo: 'Moneda romana', precio: 250, img: 'https://picsum.photos/200/301', condicion: 'Restaurado' },
    { id: 3, titulo: 'Libro histórico', precio: 180, img: 'https://picsum.photos/200/302', condicion: 'Original' },
    { id: 4, titulo: 'Silla vintage', precio: 400, img: 'https://picsum.photos/200/303', condicion: 'Restaurado' }
  ];

  getProductos(): Producto[] {
    return [...this.productos];
  }

  buscar(query: string): Producto[] {
    const q = query.toLowerCase();
    return this.productos.filter(p => p.titulo.toLowerCase().includes(q));
  }
}
