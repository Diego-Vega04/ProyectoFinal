export class Comentario {
  id?: number;   
  nota: number;
  pros: string;
  contras: string;
  opinion: string;
  id_user: number;        
  id_producto: number;   

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
    this.id_user = id_user;
    this.id_producto = id_producto;
  }
}
