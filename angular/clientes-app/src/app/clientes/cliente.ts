export class Cliente{
    id?: number; 
    nombre: string;
    apellido: string;
    createAt: string;

    constructor() {
        this.nombre = '';
        this.apellido = '';
        this.createAt = ''; // Inicializamos como null por defecto
      }
}