export class Comentario {
  id?: number;
  nota: number;
  pros: string;
  contras: string;
  opinion: string;
  usuario: { id: number };       
  producto: { id: number };      

  constructor(
    nota: number,
    pros: string,
    contras: string,
    opinion: string,
    id_user: number,
    id_producto: number
  ) {
    this.nota = nota;
    this.pros = pros;
    this.contras = contras;
    this.opinion = opinion;
    this.usuario = { id: id_user };
    this.producto = { id: id_producto };
  }
}
