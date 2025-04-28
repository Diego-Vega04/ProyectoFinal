import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private apiUrl = '';  // URL de la API para obtener los comentarios

  constructor(private http: HttpClient) { }

  // Obtener todos los comentarios
  obtenerComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.apiUrl);
  }

  // Crear un nuevo comentario
  crearComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.apiUrl, comentario);
  }
}
