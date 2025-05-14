import { Comentario } from "./comentario";
import { CategoriaProducto } from "./enums/Categoria.enum";

export class Producto {
    id?: number;
    nombre?: string;
    marca?: string;
    precio?: number;
    descripcion?: string;
    categoria?: CategoriaProducto;
    imagen?: string;
    cantidad?: number; 
    comentarios?: Comentario [];

    constructor(data?: Partial<Producto>){
       this.id = data?.id;
       this.nombre = data?.nombre;
       this.marca = data?.marca;
       this.precio = data?.precio;
       this.descripcion = data?.descripcion;
       this.categoria = data?.categoria;
       this.imagen = data?.imagen;
       this.comentarios = data?.comentarios ?? []; 
    }
}