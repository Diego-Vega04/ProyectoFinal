export class Comentario {
    id?: number;  // ID opcional porque será generado automáticamente
    contenido: string;
    autor: string;
    fecha: string; 
    valoracion: number;
    productoId: number;
  
    constructor(contenido: string, autor: string, valoracion: number, productoId: number) {
      this.contenido = contenido;
      this.autor = autor;
      this.fecha = new Date().toISOString();  // Generar la fecha actual
      this.valoracion = valoracion;
      this.productoId = productoId;
    }
  }
  