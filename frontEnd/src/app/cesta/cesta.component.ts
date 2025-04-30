import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var paypal: any;
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


export class CestaComponent implements OnInit, AfterViewInit{

  constructor(){}

  ngOnInit(): void {
      
  }

  renderPayPalButton() {
    // Borra cualquier botón anterior para evitar múltiples renders
    const container = document.getElementById('paypal-button-container');
    if (container) {
      container.innerHTML = '';
    }
  
    const total = this.getResumenTotal().total;
  
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total.toFixed(2),
              currency_code: 'EUR'
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Pago realizado por: ' + details.payer.name.given_name);
          this.cleanCart();
          this.renderPayPalButton();
        });
      },
      onError: (err: any) => {
        console.error('Error en el pago:', err);
      }
    }).render('#paypal-button-container');
  }

  ngAfterViewInit(): void {
    this.renderPayPalButton();
  }

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
    },
    {
      id: 3,
      name: 'Producto 3',
      price: 10.5,
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
    this.renderPayPalButton();
  }

  // Elimina un producto del carrito
  removeItem(item: CestaItem) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    this.renderPayPalButton();
  }

  //Vacia el carrito completo
  cleanCart(){
    this.cartItems = [];
    this.renderPayPalButton();
  }

  // Calcula el subtotal
  getSubtotal(): number {
    const subtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return parseFloat(subtotal.toFixed(2));
  }

  //Total con envío
  getResumenTotal(): { envio: number; total: number } {
    const subtotal = this.getSubtotal();
    const envio = subtotal >= 70 ? 0 : 3.99;
    let total = (subtotal + envio);

    return { envio: parseFloat(envio.toFixed(2)), total: parseFloat(total.toFixed(2)) };
  }
}
