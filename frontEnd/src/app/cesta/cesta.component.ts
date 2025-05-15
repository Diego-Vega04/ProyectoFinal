import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CarritoService } from '../services/carrito.service';
import { AuthService } from '../auth/auth.service';
import { Producto } from '../models/producto';
import { Pedido } from '../models/pedido';
import { MetodoPago } from '../models/enums/MetodoPago.enum';
import { PedidoService } from '../services/pedido.service';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var paypal: any;

@Component({
  selector: 'app-cesta',
  standalone: false,
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent implements OnInit, AfterViewInit {

  paypalRendered: boolean = false;
  cartItems: Producto[] = [];
  usuarioDb!: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUsuario();

    this.userService.getByEmail(user.email).subscribe({
      next: (usuarioDb) => {
        this.usuarioDb = usuarioDb;
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
          this.snackBar.open('Pago realizado exitosamente por: ' + details.payer.name.given_name, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
          });
          this.paypalRendered = false;

          if (!this.usuarioDb || !this.usuarioDb.id) {
            console.error("No se pudo obtener el ID del usuario para crear el pedido");
            return;
          }

          const nuevoPedido = new Pedido({
            fecha: new Date().toISOString().split('T')[0],
            metodo_pago: MetodoPago.PAYPAL,
            direccon: this.usuarioDb.direccion,
            productos: this.usuarioDb.carrito?.productos,
            user: this.usuarioDb
          });

          console.log("datos usuario: ", this.usuarioDb.id, this.usuarioDb.nombre)

          this.pedidoService.addPedido(nuevoPedido).subscribe({
            next: (res) => {
              console.log("Pedido guardado correctamente", res);
              console.log("id user nuevo epdido", nuevoPedido.id);
              this.cleanCart();
              console.log("id user nuevo epdido", nuevoPedido.user?.id);
              console.log("id pedido", res.id);
            },
            error: (err) => console.error("Error al guardar el pedido", err)
          });

          const carritoId = this.usuarioDb.carrito?.id;

          if (carritoId) {
            this.carritoService.vaciarCarrito(carritoId).subscribe({
              next: () => {
                this.cleanCart();
              },
              error: (err) => {
                console.error("Error al vaciar el carrito en el backend", err);
              }
            });
          }

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
    this.carritoService.setProductos([]);
    this.paypalRendered = false;
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
