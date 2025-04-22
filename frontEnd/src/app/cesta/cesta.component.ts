import { Component } from '@angular/core';
interface CestaItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
@Component({
  selector: 'app-cesta',
  standalone: false,
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})


export class CestaComponent {

  cartItems: CestaItem[] = [
    {
      id: 1,
      name: 'Producto 1',
      price: 29.99,
      quantity: 2,
      image: 'https://picsum.photos/200'
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 14.5,
      quantity: 1,
      image: 'https://picsum.photos/200'
    }
  ];

  get resumen(): { envio: number; total: number } {
    return this.getResumenTotal();
  }

  // Actualiza la cantidad cuando el input cambia
  updateQuantity(item: CestaItem) {
    if (item.quantity < 1) {
      item.quantity = 1;
    }
  }

  // Elimina un producto del carrito
  removeItem(item: CestaItem) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  }

  // Calcula el subtotal
  getSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  //Total con envío
  getResumenTotal(): { envio: number; total: number } {
    const subtotal = this.getSubtotal();
    const envio = subtotal >= 70 ? 0 : 3.99;
    let total = subtotal + envio;
  
    return { envio, total };
  }

  // Simula ir al checkout
  checkout() {
    alert('Redirigiendo al checkout...');
    // Aquí podrías usar Router para navegar a otra vista
    // this.router.navigate(['/checkout']);
  }
}
