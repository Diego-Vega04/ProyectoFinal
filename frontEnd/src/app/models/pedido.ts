import { MetodoPago } from "./enums/MetodoPago.enum";
import { Producto } from "./producto";
import { User } from "./user";

export class Pedido {
    id?: number;
    fecha: string; 
    metodo_pago: MetodoPago; 
    direccon: string;
    productos: Producto[];
    user?: User;

    constructor(data?: Partial<Pedido>){
        this.id = data?.id;
        this.fecha = data?.fecha ?? new Date().toISOString().split('T')[0];
        this.metodo_pago = data?.metodo_pago ?? MetodoPago.PAYPAL;
        this.direccon = data?.direccon ?? '';
        this.productos = data?.productos ?? [];
        this.user = data?.user; 
    }
}