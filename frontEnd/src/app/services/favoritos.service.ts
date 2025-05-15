import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Favoritos } from "../models/favoritos";
import { Producto } from "../models/producto";

@Injectable({
    providedIn: 'root'
})
export class FavoritosService {
    private apiUrl = 'http://localhost:8081/api/favoritos';

    constructor(private http: HttpClient) { }

    //Obtener lista de favoritos por ID de usuario
    getByUserId(idUser: number): Observable<Favoritos> {
        return this.http.get<Favoritos>(`${this.apiUrl}/user/${idUser}`);
    }

    //Actualizar la lista de favoritos
    actualizarFavoritos(favoritos: Favoritos): Observable<Favoritos> {
        return this.http.put<Favoritos>(`${this.apiUrl}/actualizar`, favoritos);
    }

    // Añadir un producto a una lista de favoritos existente
    addProductos(idFavoritos: number, producto: Producto): Observable<Favoritos> {
        return this.http.post<Favoritos>(`${this.apiUrl}/${idFavoritos}/productos`, producto);
    }

    // Obtener favoritos por ID de usuario
    getFavoritosById(id: number): Observable<Favoritos> {
        return this.http.get<Favoritos>(`${this.apiUrl}/id/${id}`);
    }

    //Crear favoritos según id del usuario
    createFavoritos(userId: number): Observable<Favoritos> {
        return this.http.post<Favoritos>(`${this.apiUrl}/crear/${userId}`, {});
    }
}