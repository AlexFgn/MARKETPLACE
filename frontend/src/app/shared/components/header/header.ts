import { Component, ViewChild, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../features/productos/services/productos/productos';
import { CarritoService } from '../../../core/services/carrito.service';
import { MiniCarritoComponent } from '../../../features/carrito/componentes/mini-carrito/mini-carrito';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MiniCarritoComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  query = '';
  cantidadCarrito = 0;
  mostrarMiniCarrito = false;

  @ViewChild(MiniCarritoComponent) miniCarrito?: MiniCarritoComponent;
  private _refreshListener?: () => void;

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private ngZone: NgZone
  ) {}

  buscar() {
    window.dispatchEvent(new CustomEvent('app-search', { detail: { q: this.query } }));
  }

  ngDoCheck() {
    this.cantidadCarrito = this.carritoService.contar();
  }

  toggleCarrito() {
    this.mostrarMiniCarrito = !this.mostrarMiniCarrito;
    if (this.mostrarMiniCarrito) {
      setTimeout(() => this.syncMiniCarrito(), 0);
    }
  }

  private syncMiniCarrito() {
    const items = this.carritoService.getItems();
    if (!this.miniCarrito) return;
    this.ngZone.run(() => {
      (this.miniCarrito as any).productos = items;
      (this.miniCarrito as any).total = items.reduce((sum: number, p: any) => sum + (p.precio ?? 0), 0);
    });
  }

  ngOnInit() {
    this._refreshListener = () => {
      if (this.mostrarMiniCarrito) this.syncMiniCarrito();
    };
    window.addEventListener('carrito:refresh', this._refreshListener);
  }

  ngOnDestroy() {
    if (this._refreshListener) {
      window.removeEventListener('carrito:refresh', this._refreshListener);
    }
  }
}
