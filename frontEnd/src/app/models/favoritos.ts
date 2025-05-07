import { Producto } from "./producto";
import { User } from "./user";

export class Favoritos {
    id?: number;
    user?: User; 
    productos: Producto[];

    constructor(data?: Partial<Favoritos>) {
        this.id = data?.id;
        this.user = data?.user;
        this.productos = data?.productos ?? [];
    }
}