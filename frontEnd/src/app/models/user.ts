import { Carrito } from "./carrito";
import { Favoritos } from "./favoritos";
import { Pedido } from "./pedido";

export class User{
    id?: number;
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    cp: number;
    direccion: string;
    rol: 'ADMIN' | 'USER';
    carrito?: Carrito;
    favoritos?: Favoritos;
    pedidos?: Pedido[];

    constructor(data?: Partial<User>){
        this.id = data?.id;
        this.nombre = data?.nombre ?? '';
        this.apellidos = data?.apellidos ?? '';
        this.email = data?.email ?? '';
        this.password = data?.password ?? '';
        this.cp = data?.cp ?? 0;
        this.direccion = data?.direccion ?? '';
        this.rol = data?.rol ?? 'USER';
        this.carrito = data?.carrito;
        this.favoritos = data?.favoritos;
        this.pedidos = data?.pedidos ?? [];
    }
}