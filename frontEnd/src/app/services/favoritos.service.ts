import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Favoritos } from "../models/favoritos";

@Injectable({
    providedIn: 'root'
})
export class FavoritosService {
    private apiUrl = 'http://localhost:8080/api/favoritos';

    constructor(private http: HttpClient){}

    //Obtener lista de favoritos por ID de usuario
    getByUserId(idUser: number): Observable<Favoritos> {
        return this.http.get<Favoritos>(`${this.apiUrl}/user/${idUser}`);
    }

    //Actualizar la lista de favoritos
    actualizarFavoritos(favoritos: Favoritos): Observable<Favoritos> {
        return this.http.put<Favoritos>(`${this.apiUrl}/actualizar`, favoritos);
    }
}