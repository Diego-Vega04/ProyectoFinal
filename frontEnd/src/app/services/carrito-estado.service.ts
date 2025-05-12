import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Producto } from "../models/producto";

@Injectable({
    providedIn: 'root'
})
export class CarritoEstadoService {
    private productos: Producto[] = [];

    agregarProducto(producto: Producto) {
        this.productos.push(producto);
    }

    getProductos(): Producto[] {
        return this.productos;
    }

    vaciarCarrito() {
        this.productos = [];
    }

    eliminarProducto(index: number) {
        this.productos.splice(index, 1);
    }
}