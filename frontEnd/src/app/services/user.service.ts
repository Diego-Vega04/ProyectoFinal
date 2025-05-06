import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private apiUrl = 'http://localhost:8080/api/users';

    constructor(private http: HttpClient){}

    //Obtener usuario por email
    getByEmail(email: string): Observable<User> {
        return this.http.get<User>(`$(this.apiUrl)/email/${email}`);
    }

    //Obtener usuario por ID
    getById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/id/${id}`);
    }

    //Crear nuevo usuario
    addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/añadir`, user);
    }

    //Actualizar usuario
    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/actualizar`, user);
    }

    //Eliminar usuario por ID
    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/borrar/${id}`);
    }
}