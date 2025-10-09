// src/app/features/productos/pages/productos-lista/productos-lista.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosService, Producto } from '../../services/productos/productos';
import { CarritoService } from '../../../../core/services/carrito.service';

import { NavbarComponent } from '../../../../shared/components/navbar/navbar';
import { CarouselComponent } from '../../../../shared/components/carousel/carousel';
import { FiltersComponent } from '../../../filters/filters';

@Component({
  selector: 'app-productos-lista',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CarouselComponent, FiltersComponent],
  templateUrl: './productos-lista.html',
  styleUrls: ['./productos-lista.css']
})
export class ProductosListaComponent implements OnInit {
  productos: Producto[] = [];
  mostrados: Producto[] = [];
  filtros: { min?: number | null; max?: number | null; condiciones?: string[] } = {
    min: null,
    max: null,
    condiciones: []
  };

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.productos = this.productosService.getProductos();
    this.mostrados = [...this.productos];
  }

  agregar(p: Producto) {
    this.carritoService.agregar(p);
  }

  aplicarFiltros(payload: { min?: number; max?: number; condiciones?: string[] }) {
    this.filtros = {
      min: payload.min ?? null,
      max: payload.max ?? null,
      condiciones: payload.condiciones ?? []
    };

    this.mostrados = this.productos.filter(prod => {
      if (this.filtros.min != null && prod.precio < (this.filtros.min ?? 0)) return false;
      if (this.filtros.max != null && prod.precio > (this.filtros.max ?? Infinity)) return false;
      if (this.filtros.condiciones && this.filtros.condiciones.length > 0) {
        return this.filtros.condiciones.includes(prod.condicion ?? '');
      }
      return true;
    });
  }

  onSortChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value ?? 'relevance';

    if (value === 'price_asc') {
      this.mostrados.sort((a, b) => a.precio - b.precio);
    } else if (value === 'price_desc') {
      this.mostrados.sort((a, b) => b.precio - a.precio);
    } else {
      this.mostrados = this.mostrados.slice().sort((a, b) => a.id - b.id);
    }
  }
}
