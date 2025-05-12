import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { Producto } from '../models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { CarritoService } from '../services/carrito.service';
import { CarritoEstadoService } from '../services/carrito-estado.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Carrito } from '../models/carrito';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  productId!: number;
  product!: Producto | undefined;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductoService,
    private carritoEstadoService: CarritoEstadoService,
    private carritoService: CarritoService,
    private authService: AuthService,
    private http: HttpClient,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    //Cargar el producto
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      this.productService.getById(this.productId).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
          console.error('Error al cargar el producto', err);
        }
      });
    });

    //Cargar la cesta
    const user = this.authService.getUsuario();

    /*
    this.carritoService.getCarritoByUserId(user?.id).subscribe({
      next: (carrito) => {
        // El carrito ya existe
        this.carrito = carrito;
      }
    });
    */
  }

  openReviewDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '500px',
      data: { pros: '', cons: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Pros:', result.pros);
        console.log('Cons:', result.cons);
      }
    });
  }

  @Input() producto!: Producto;

  addCarrito(producto: Producto) {
    const user = this.authService.getUsuario();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    console.log("usuario: " + user.nombre + " id: " + user.id);

    this.userService.getByEmail(user.email).subscribe({
      next: (user) => {
        const idCarrito = user.carrito?.id;

        if (idCarrito !== undefined) {
          console.log("idCarrito", idCarrito);

          this.carritoService.addProductos(idCarrito, producto).subscribe({
            next: (carritoActualizado) => {
              console.log("Producto agregado al carrito del backend:", carritoActualizado);
              this.carritoEstadoService.agregarProducto(producto);
            },
            error: (err) => {
              console.error("Error al agregar producto al carrito:", err);
            }
          });
        } else {
          console.error("No se pudo obtener el ID del carrito.");
        }
      },
      error: (err) => {
        console.error("Error al obtener el usuario por email:", err);
      }
    });

    console.log("carrito:", this.carritoEstadoService.getProductos());
  }


}
