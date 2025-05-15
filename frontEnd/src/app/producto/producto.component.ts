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
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeycloakService } from 'keycloak-angular';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  productId!: number;
  product!: Producto | undefined;
  adds: Set<number> = new Set();
  productosSimilares: Producto[] = [];
  ratingAverage = 0;
  ratingCounts = [0, 0, 0, 0, 0];
  totalReviews = 0;
  isAdmin = false;
  editMode = false;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductoService,
    private carritoEstadoService: CarritoEstadoService,
    private carritoService: CarritoService,
    private favoritoService: FavoritosService,
    private authService: AuthService,
    private http: HttpClient,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private keycloakService: KeycloakService
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

    this.calcularResumenOpiniones();

    //Validar si el producto ya esta en la cesta
    const productCesta = this.carritoEstadoService.getProductos();

    productCesta.forEach(p => {
      if (p.id !== undefined) {
        this.adds.add(p.id)
      }
    });

    //Cargar productos similares
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getById(productId).subscribe((producto) => {
      this.product = producto;
      this.cargarProductosSimilares(producto);
    });

    //Validar si ha hecho login y su rol
    this.isAdmin = this.keycloakService.isUserInRole('admin');
  }

  async openReviewDialog(): Promise<void> {
    const isLogged = await this.authService.isLoggedIn();

    if (!isLogged) {
      await this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '500px',
      data: { pros: '', cons: '', opinion: '', rating: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Opinión recibida:', result);
        // Aquí guardarías la opinión en tu producto
      }
    });
  }

  addCarrito(producto: Producto) {
    const user = this.authService.getUsuario();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    console.log("usuario: " + user.nombre + " id: " + user.id);

    if (producto.id !== undefined && this.adds.has(producto.id)) {
      return;
    }

    this.userService.getByEmail(user.email).subscribe({
      next: (user) => {
        const idCarrito = user.carrito?.id;

        if (idCarrito !== undefined) {
          console.log("idCarrito", idCarrito);

          this.carritoService.addProductos(idCarrito, producto).subscribe({
            next: (carritoActualizado) => {
              console.log("Producto agregado al carrito del backend:", carritoActualizado);
              this.carritoService.updateProductos(carritoActualizado.productos);

              console.log("carrito:", this.carritoService.getCarritoById(idCarrito));

              if (producto.id !== undefined) {
                this.adds.add(producto.id!);
              }

              this.carritoService.getCarritoById(idCarrito).subscribe(carrito => {
                carrito.productos.forEach(p => {
                  if (p.id !== undefined) {
                    this.adds.add(p.id);
                  }
                });
              });

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

  }

  addFavorito(producto: Producto) {
    const user = this.authService.getUsuario();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    console.log("usuario: " + user.nombre + " id: " + user.id);

    if (producto.id !== undefined && this.adds.has(producto.id)) {
      return;
    }

    this.userService.getByEmail(user.email).subscribe({
      next: (user) => {
        const idFavs = user.favoritos?.id;

        if (idFavs !== undefined) {
          console.log("idFavoritos", idFavs);

          this.favoritoService.addProductos(idFavs, producto).subscribe({
            next: (favActualizado) => {
              console.log("Producto agregado al carrito del backend:", favActualizado);
              this.carritoService.updateProductos(favActualizado.productos);

              if (producto.id !== undefined) {
                this.adds.add(producto.id!);
              }

              this.favoritoService.getFavoritosById(idFavs).subscribe(favs => {
                favs.productos.forEach(p => {
                  if (p.id !== undefined) {
                    this.adds.add(p.id);
                  }
                });
              });

            },
            error: (err) => {
              console.error("Error al agregar producto a favoritos:", err);
            }
          });
        } else {
          console.error("No se pudo obtener el ID de la lista de favoritos.");
        }
      },
      error: (err) => {
        console.error("Error al obtener el usuario por email:", err);
      }
    });

  }

  getTextoBoton(producto: Producto): string {
    if (producto.id !== undefined && this.adds.has(producto.id)) {
      return 'Producto añadido a la cesta';
    }
    return 'Añadir a la cesta';
  }

  getFavsTextoBoton(producto: Producto): string {
    if (producto.id !== undefined && this.adds.has(producto.id)) {
      return 'Producto añadido a favoritos';
    }
    return 'Añadir a favoritos';
  }

  cargarProductosSimilares(producto: Producto): void {
    this.productService.getAllProductos().subscribe((todosProductos) => {
      this.productosSimilares = todosProductos.filter(p =>
        p.id !== producto.id &&
        String(p.categoria).toUpperCase().trim() === String(producto.categoria).toUpperCase().trim()
      ).slice(0, 5);
    });
  }

  calcularResumenOpiniones() {

    if (!this.product?.comentarios || this.product.comentarios.length === 0) return;

    this.totalReviews = this.product.comentarios.length;
    console.log("reviews", this.totalReviews);
    console.log("comentario", this.product.comentarios.length);
    let suma = 0;
    this.ratingCounts = [0, 0, 0, 0, 0];

    for (const comentario of this.product.comentarios) {
      const nota = comentario.nota;
      if (nota >= 1 && nota <= 5) {
        this.ratingCounts[nota - 1]++;
        suma += nota;
      }
    }

    this.ratingAverage = +(suma / this.totalReviews).toFixed(1);
  }

  getPorcentaje(nivel: number): number {
    if (this.totalReviews === 0) return 0;
    return (this.ratingCounts[nivel - 1] / this.totalReviews) * 100;
  }

  editMethod() {
    this.editMode = !this.editMode;
  }

  guardarProducto() {
    if (!this.product) return;

    this.productService.updateProducto(this.product).subscribe({
      next: (updatedProduct) => {
        console.log('Producto actualizado:', updatedProduct);
        this.editMode = false;
      },
      error: (err) => {
        console.error('Error al actualizar producto:', err);
      }
    });
  }
}
