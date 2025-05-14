import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Producto } from "../models/producto";

@Injectable({
    providedIn: 'root'
})
export class CarritoEstadoService {
    private productos: Producto[] = [];
    private productosSubject = new BehaviorSubject<Producto[]>([]);

    agregarProducto(producto: Producto) {
        this.productos.push(producto);
        this.productosSubject.next([...this.productos]);
    }

    getProductos(): Producto[] {
        return [...this.productos];
    }

    getProductosObservable() {
        return this.productosSubject.asObservable();
    }

    vaciarCarrito() {
        this.productos = [];
        this.productosSubject.next(this.productos);
    }

    eliminarProducto(index: number) {
        this.productos.splice(index, 1);
        this.productosSubject.next(this.productos);
    }

    actualizarProductos(productos: Producto[]) {
        this.productos = [...productos];
        this.productosSubject.next([...this.productos]);
    }
}