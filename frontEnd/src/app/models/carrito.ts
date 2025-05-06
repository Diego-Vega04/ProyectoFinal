import { User } from "./user";

export class Carrito {
    id: number;
    productos: Producto[];
    user?: User; 

    constructor(data?: Partial<Carrito>){
        this.id = data?.id ?? 0;
        this.productos = data?.productos ?? [];
        this.user = data?.user;
    }
}