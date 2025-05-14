import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CarritoService } from '../services/carrito.service';
import { AuthService } from '../auth/auth.service';
import { Producto } from '../models/producto';

declare var paypal: any;

@Component({
  selector: 'app-cesta',
  standalone: false,
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent implements OnInit, AfterViewInit {

  paypalRendered: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private carritoService: CarritoService
  ) { }

  cartItems: Producto[] = [];

  ngOnInit(): void {
    const user = this.authService.getUsuario();

    this.userService.getByEmail(user.email).subscribe({
      next: (usuarioDb) => {
        const carritoId = usuarioDb.carrito?.id;
        if (carritoId !== undefined) {
          this.carritoService.getCarritoById(carritoId).subscribe({
            next: (carrito) => {
              this.cartItems = carrito.productos.map(p => ({ ...p, cantidad: 1 }));
              this.renderPayPalButton();
            },
            error: (err) => {
              console.error('Error al cargar productos del carrito', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener usuario', err);
      }
    })
  }

  ngAfterViewChecked(): void {
    if (!this.paypalRendered && this.cartItems.length > 0) {
      const container = document.getElementById('paypal-button-container');

      if (container) {
        this.paypalRendered = true;

        // ✅ Aplaza el renderizado para el próximo ciclo del event loop
        setTimeout(() => {
          this.renderPayPalButton();
        }, 0);
      }
    }
  }

  ngAfterViewInit(): void {
    this.renderPayPalButton();
  }

  renderPayPalButton() {
    const container = document.getElementById('paypal-button-container');
    if (!container) {
      console.warn('Contenedor PayPal no encontrado aún.');
      return;
    }

    container.innerHTML = '';

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
          this.paypalRendered = false; 
        });
      },
      onError: (err: any) => {
        console.error('Error en el pago:', err);
      }
    }).render('#paypal-button-container');
  }



  get resumen(): { envio: number; total: number } {
    return this.getResumenTotal();
  }

  // Actualiza la cantidad cuando el input cambia
  updateQuantity(item: Producto) {
    if (item.cantidad! < 1) {
      item.cantidad = 1;
    }
    this.renderPayPalButton();
  }

  //Vacia el carrito completo
  cleanCart() {
    this.cartItems = [];
    this.renderPayPalButton();
  }

  // Calcula el subtotal
  getSubtotal(): number {
    const subtotal = this.cartItems.reduce((acc, item) => acc + item.precio! * item.cantidad!, 0);
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
