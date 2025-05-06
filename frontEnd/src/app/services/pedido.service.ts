import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pedido } from "../models/pedido";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    private apiUrl = 'http://localhost:8080/api/pedidos';

    constructor(private http: HttpClient){}

    //Añadir pedido
    addPedido(pedido: Pedido): Observable<Pedido> {
        return this.http.post<Pedido>(`${this.apiUrl}/añadir`, pedido);
    }

    //Obtener todos los pedidos por ID de usuario
    getPedidosByUser(idUser: number): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(`${this.apiUrl}/user/${idUser}`);
    }

    //Obtener un pedido por su ID
    getPedidoById(id: number): Observable<Pedido> {
        return this.http.get<Pedido>(`${this.apiUrl}/id/${id}`);
    }
}