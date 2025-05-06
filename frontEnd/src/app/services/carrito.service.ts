import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Carrito } from "../models/carrito";

@Injectable({
    providedIn: 'root'
})
export class CarritoService {
    private apiUrl = 'http://localhost:8080/api/carritos';

    constructor(private http: HttpClient) { }
    //Obtener carrito por ID
    getCarritoById(id: number): Observable<Carrito> {
        return this.http.get<Carrito>(`${this.apiUrl}/id/${id}`);
    }

    //Obtener carrito por ID de usuario
    getCarritoByUserId(userId: number): Observable<Carrito> {
        return this.http.get<Carrito>(`${this.apiUrl}/user/${userId}`);
    }

    //Crear un nuevo carrito
    addCarrito(carrito: Carrito): Observable<Carrito> {
        return this.http.post<Carrito>(`${this.apiUrl}/añadir`, carrito);
    }

    //Actualizar un carrito
    updateCarrito(carrito: Carrito): Observable<Carrito> {
        return this.http.put<Carrito>(`${this.apiUrl}/actualizar`, carrito);
    }
}