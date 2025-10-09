import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../../core/services/carrito.service';
import { Producto } from '../../../../core/models/producto';

@Component({
  selector: 'app-mini-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-carrito.html',
  styleUrls: ['./mini-carrito.css']
})
export class MiniCarritoComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  total = 0;
  private _refreshListener?: () => void;

  constructor(
    private carritoService: CarritoService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.productos = this.carritoService.getItems();
    this.total = this.productos.reduce((s, p) => s + (p.precio ?? 0), 0);

    this._refreshListener = () => {
      const items = this.carritoService.getItems();
      this.ngZone.run(() => {
        this.productos = items;
        this.total = this.productos.reduce((s, p) => s + (p.precio ?? 0), 0);
      });
    };

    window.addEventListener('carrito:refresh', this._refreshListener);
  }

  eliminar(producto: Producto) {
    this.carritoService.eliminar(producto);
    const items = this.carritoService.getItems();
    this.productos = items;
    this.total = this.productos.reduce((s, p) => s + (p.precio ?? 0), 0);
  }

  vaciar() {
    this.carritoService.vaciar();
    this.productos = [];
    this.total = 0;
  }

  ngOnDestroy() {
    if (this._refreshListener) {
      window.removeEventListener('carrito:refresh', this._refreshListener);
    }
  }
}
