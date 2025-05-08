import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../models/producto";
import { CategoriaProducto } from "../models/enums/Categoria.enum";

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private apiUrl = 'http://localhost:8080/api/productos';

    constructor(private http: HttpClient){}

    //prodcuto por id
    getById(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.apiUrl}/id/${id}`);
    }

    //guardar nuevo producto
    addProducto(a: Producto): Observable<Producto> {
        return this.http.post<Producto>(`${this.apiUrl}/añadir`, a);
    }

    //actualizar producto existente
    updateProducto(a: Producto): Observable<Producto> {
        return this.http.put<Producto>(`${this.apiUrl}/actualizar`, a);
    }

    //borrar un producto por su id
    deleteProducto(id: number): Observable<any> {
        return this.http.get<Producto>(`${this.apiUrl}/borrar/${id}`);
    }

    //todos los productos
    getAllProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(`${this.apiUrl}`);
    }

    //productos por marca
    getProductosMarca(marca: string): Observable<Producto[]> {
        return this.http.get<Producto[]>(`${this.apiUrl}/marca/${marca}`);
    }

    //productos por categoria
    getProductosCategoria(categoria: CategoriaProducto): Observable<Producto[]> {
        return this.http.get<Producto[]>(`${this.apiUrl}/categoria/${categoria}`);
    }
}