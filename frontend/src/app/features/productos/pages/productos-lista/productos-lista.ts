// src/app/features/productos/pages/productos-lista/productos-lista.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosService, Producto } from '../../services/productos/productos';
import { CarritoService } from '../../../../core/services/carrito.service';

// Standalone components que se usan en la plantilla:
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
  mostrados: Producto[] = []; // listado que se muestra (aplicando filtros/orden)
  // estado de filtros (opcional, según lo que emita FiltersComponent)
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
    // inicialmente mostramos todos
    this.mostrados = [...this.productos];
  }

  agregar(p: Producto) {
    this.carritoService.agregar(p);
  }

  // Handler llamado desde <app-filters (apply)="aplicarFiltros($event)">
  aplicarFiltros(payload: { min?: number; max?: number; condiciones?: string[] }) {
    // Guardamos los filtros (por si los necesitamos)
    this.filtros = {
      min: payload.min ?? null,
      max: payload.max ?? null,
      condiciones: payload.condiciones ?? []
    };

    this.mostrados = this.productos.filter(prod => {
      // filtro por precio
      if (this.filtros.min != null && prod.precio < (this.filtros.min ?? 0)) {
        return false;
      }
      if (this.filtros.max != null && prod.precio > (this.filtros.max ?? Infinity)) {
        return false;
      }
      // filtro por condiciones (si se especificaron)
      if (this.filtros.condiciones && this.filtros.condiciones.length > 0) {
        return this.filtros.condiciones.includes(prod.condicion ?? '');
      }
      return true;
    });
  }

  // Handler para el select de orden. Se espera un Event
  onSortChange(event: Event) {
    // protegemos el acceso al target
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value ?? 'relevance';

    if (value === 'price_asc') {
      this.mostrados.sort((a, b) => a.precio - b.precio);
    } else if (value === 'price_desc') {
      this.mostrados.sort((a, b) => b.precio - a.precio);
    } else {
      // 'relevance' u otro: devolvemos el orden original (por id)
      this.mostrados = this.mostrados.slice().sort((a, b) => a.id - b.id);
    }
  }
}
