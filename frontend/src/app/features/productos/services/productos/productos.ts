import { Injectable } from '@angular/core';



export interface Producto {
  id: number;
  titulo: string;
  precio: number;
  img: string;
  condicion?: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productos: Producto[] = [
    {
      id: 1,
      titulo: 'Reloj antiguo',
      precio: 120,
      img: 'assets/images/reloj.jpg',
      descripcion: 'Un elegante reloj de época en excelente estado de conservación.'
    },
    {
      id: 2,
      titulo: 'Moneda romana',
      precio: 250,
      img: 'assets/images/moneda.jpg',
      descripcion: 'Auténtica moneda del Imperio Romano cuidadosamente restaurada.'
    },
    {
      id: 3,
      titulo: 'Libro histórico',
      precio: 180,
      img: 'assets/images/libro.jpg',
      descripcion: 'Edición original de un clásico histórico con gran valor cultural.'
    },
    {
      id: 4,
      titulo: 'Silla vintage',
      precio: 400,
      img: 'assets/images/silla.jpg',
      descripcion: 'Silla de diseño vintage restaurada con materiales de alta calidad.'
    },
    {
      id: 5,
      titulo: 'Mapa antiguo',
      precio: 320,
      img: 'assets/images/mapa.jpg',
      descripcion: 'Mapa cartográfico del siglo XIX, ideal para coleccionistas y decoradores.'
    },
    {
      id: 6,
      titulo: 'Cámara analógica clásica',
      precio: 280,
      img: 'assets/images/camara1.jpg',
      descripcion: 'Cámara fotográfica analógica de colección en perfecto funcionamiento.'
    }
  ];

  getProductos(): Producto[] {
    return [...this.productos];
  }

  buscar(query: string): Producto[] {
    const q = query.toLowerCase();
    return this.productos.filter(p => p.titulo.toLowerCase().includes(q));
  }
}
