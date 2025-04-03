export class Producto{
    id?: number; 
    nombre: String;
    cantidad: number;
    precio: number;
    categoria: String; 
    ubicacion: String;

    constructor(){
        this.nombre = '';
        this.cantidad = 0;
        this.precio = 0.00;
        this.categoria = '';
        this.ubicacion = '';
    }
}