import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from "rxjs";
import { Producto } from "./producto";
import Swal from 'sweetalert2';

@Injectable()
export class ProductoService{

    private urlEndpoint: string = 'http://localhost:8081/producto'
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient, private router: Router){}

    getProductos(): Observable<Producto[]>{
        return this.http.get(this.urlEndpoint).pipe(
            map(response => {
                let productos = response as Producto[];
                return productos.map(producto => {
                    producto.nombre = producto.nombre.toUpperCase();
                    return producto;
                });
            })
        );
    }

    create(producto: Producto) : Observable<Producto>{
        return this.http.post<Producto>(this.urlEndpoint, producto, {headers: this.httpHeaders}).pipe(
          catchError(e => {
            if(e.status==400){
              return throwError(() => new Error(e));
            }
    
            console.error(e.error.mensaje);
            Swal.fire(e.error.mensaje, e.error.error, 'error');
            return throwError(() => new Error(e.error.mensaje));
          })
        );
      }
    
      getProducto(id: number): Observable<Producto>{
        return this.http.get<Producto>(`${this.urlEndpoint}/${id}`).pipe(
          catchError(e => {
            this.router.navigate(['/producto']);
            console.error(e.error.mensaje);
            Swal.fire('Error a editar', e.error.mensaje, 'error');
            return throwError(() => new Error(e.error.mensaje));
          })
        );
      }

      getProductosUbi(ubi: string): Observable<Producto[]>{
        return this.http.get<Producto>(`${this.urlEndpoint}/ubi?ubi=${ubi}`).pipe(
          map(response => {
            let productos = response as unknown as Producto[];
            return productos.map(producto => {
                producto.nombre = producto.nombre.toUpperCase();
                return producto;
            });
        })
        );
      }

      getProductosNombre(nombre: string): Observable<Producto[]>{
        return this.http.get<Producto>(`${this.urlEndpoint}/nombre?nombre=${nombre}`).pipe(
          map(response => {
            let productos = response as unknown as Producto[];
            return productos.map(producto => {
              producto.nombre = producto.nombre.toUpperCase();
              return producto;
            })
          })
        )
      }
    
      update(producto: Producto): Observable<Producto>{
        return this.http.put<Producto>(`${this.urlEndpoint}/${producto.id}`, producto, {headers: this.httpHeaders}).pipe(
          catchError(e => {
            console.error(e.error.mensaje);
            Swal.fire(e.error.mensaje, e.error.error, 'error');
            return throwError(() => new Error(e.error.mensaje));
          })
        );
      }
    
      delete(id: number): Observable<Producto>{
        return this.http.delete<Producto>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
          catchError(e => {
            console.error(e.error.mensaje);
            Swal.fire(e.error.mensaje, e.error.error, 'error');
            return throwError(() => new Error(e.error.mensaje));
          })
        );
      }

}