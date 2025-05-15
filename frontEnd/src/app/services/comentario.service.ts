import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private apiUrl = 'http://localhost:8081/api/comentarios';

  constructor(private http: HttpClient) { }

  obtenerComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.apiUrl);
  }

  crearComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.apiUrl}/añadir`, comentario);
  }

  actualizarComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.apiUrl}/actualizar`, comentario);
  }

  eliminarComentario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/borrar/${id}`);
  }

  obtenerComentarioPorId(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.apiUrl}/id/${id}`);
  }

  obtenerPorProducto(idProducto: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/producto/${idProducto}`);
  }

  obtenerPorUsuario(idUsuario: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/user/${idUsuario}`);
  }
}
