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
import { ComentariosService } from '../services/comentario.service';
import { Comentario } from '../models/comentario';

@Component({
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  productId!: number;
  product!: Producto | undefined;
  productosSimilares: Producto[] = [];
  ratingAverage = 0;
  ratingCounts = [0, 0, 0, 0, 0];
  totalReviews = 0;
  isAdmin = false;
  editMode = false;
  addBotonCarrito: Set<number> = new Set();
  addBotonfavs: Set<number> = new Set();

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
    private comentarioService: ComentariosService,
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
          this.calcularResumenOpiniones();
        },
        error: (err) => {
          console.error('Error al cargar el producto', err);
        }
      });
    });

    //Validar si el producto ya esta en la cesta
    const usuario = this.authService.getUsuario();

    if (usuario?.email) {
      this.userService.getByEmail(usuario.email).subscribe({
        next: (usuarioDb) => {
          const carritoId = usuarioDb.carrito?.id;
          if (carritoId) {
            this.carritoService.getCarritoById(carritoId).subscribe({
              next: (carrito) => {
                carrito.productos.forEach(p => {
                  if (p.id !== undefined) {
                    this.addBotonCarrito.add(p.id);
                  }
                });
              },
              error: (err) => console.error('Error al obtener productos del carrito:', err)
            });
          }

          const favoritosId = usuarioDb.favoritos?.id;
          if (favoritosId) {
            this.favoritoService.getFavoritosById(favoritosId).subscribe({
              next: (favoritos) => {
                favoritos.productos.forEach(p => {
                  if (p.id !== undefined) {
                    this.addBotonfavs.add(p.id);
                  }
                });
              },
              error: (err) => console.error('Error al obtener favoritos:', err)
            });
          }

        },
        error: (err) => console.error('Error al obtener usuario desde email', err)
      });
    }

    //Cargar productos similares
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getById(productId).subscribe((producto) => {
      this.product = producto;
      this.cargarProductosSimilares(producto);
    });

    //Validar si ha hecho login y su rol
    this.isAdmin = this.keycloakService.isUserInRole('admin');
  }

  recargarProducto(): void {
    this.productService.getById(this.productId).subscribe({
      next: (productoActualizado) => {
        this.product = productoActualizado;
        this.calcularResumenOpiniones();
      },
      error: err => console.error('Error al recargar producto:', err)
    });
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
        const usuario = this.authService.getUsuario();

        if (!usuario || !usuario.id) {
          console.error('Usuario no encontrado');
          return;
        }

        const nuevoComentario = new Comentario(
          result.rating,
          result.pros,
          result.cons,
          result.opinion,
          usuario.id,
          this.productId
        );

        this.comentarioService.crearComentario(nuevoComentario).subscribe({
          next: () => {
            this.productService.getById(this.productId).subscribe({
              next: (productoActualizado) => {
                this.product = productoActualizado;
                this.calcularResumenOpiniones();
                console.log("comentarios",)
              },
              error: err => console.error('Error al actualizar producto:', err)
            });
          },
          error: err => console.error('Error al crear comentario:', err)
        });
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

    if (producto.id !== undefined) {
      this.addBotonCarrito.add(producto.id);
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
                this.addBotonCarrito.add(producto.id!);
              }

              this.carritoService.getCarritoById(idCarrito).subscribe(carrito => {
                carrito.productos.forEach(p => {
                  if (p.id !== undefined) {
                    this.addBotonCarrito.add(p.id);
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

    if (producto.id !== undefined) {
      this.addBotonfavs.add(producto.id);
    }

    this.userService.getByEmail(user.email).subscribe({
      next: (user) => {
        let idFavs = user.favoritos?.id;

        if (!idFavs) {
          this.favoritoService.createFavoritos(user.id!).subscribe({
            next: (nuevoFavoritos) => {
              idFavs = nuevoFavoritos.id;
              this.procesarAddFavorito(idFavs!, producto);
            },
            error: (err) => {
              console.error("No se pudo crear la lista de favoritos:", err);
            }
          });
        } else {
          this.procesarAddFavorito(idFavs, producto);
        }
      },
      error: (err) => {
        console.error("Error al obtener el usuario por email:", err);
      }
    });
  }

  private procesarAddFavorito(idFavs: number, producto: Producto) {
    this.favoritoService.addProductos(idFavs, producto).subscribe({
      next: (favoritosActualizado) => {
        console.log("Producto agregado a favoritos:", favoritosActualizado);

        this.favoritoService.getFavoritosById(idFavs).subscribe(favs => {
          favs.productos.forEach(p => {
            if (p.id !== undefined) {
              this.addBotonfavs.add(p.id);
            }
          });
        });
      },
      error: (err) => {
        console.error("Error al agregar producto a favoritos:", err);
      }
    });
  }


  getTextoBoton(producto: Producto): string {
    if (producto.id !== undefined && this.addBotonCarrito.has(producto.id)) {
      return 'Producto añadido a la cesta';
    }
    return 'Añadir a la cesta';
  }

  getFavsTextoBoton(producto: Producto): string {
    if (producto.id !== undefined && this.addBotonfavs.has(producto.id)) {
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

  eliminarComentario(id: number): void {
    this.comentarioService.eliminarComentario(id).subscribe({
      next: () => {
        console.log('Comentario eliminado');

        // Eliminar comentario de la interfaz (lista en memoria)
        if (this.product?.comentarios) {
          this.product.comentarios = this.product.comentarios.filter(c => c.id !== id);
          this.calcularResumenOpiniones(); // Recalcula estadísticas
        }

        // Mostrar notificación (opcional)
        this.snackBar.open('Comentario eliminado con éxito', 'Cerrar', { duration: 2000 });
      },
      error: err => {
        console.error('Error al eliminar comentario:', err);
        this.snackBar.open('Error al eliminar comentario', 'Cerrar', { duration: 3000 });
      }
    });
  }

  editarComentario(comentario: Comentario): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '500px',
      data: {
        pros: comentario.pros,
        cons: comentario.contras,
        opinion: comentario.opinion,
        rating: comentario.nota
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const comentarioEditado = new Comentario(
          result.rating,
          result.pros,
          result.cons,
          result.opinion,
          comentario.usuario.id,
          comentario.producto.id
        );
        comentarioEditado.id = comentario.id;

        this.comentarioService.actualizarComentario(comentarioEditado).subscribe({
          next: () => this.recargarProducto(),
          error: err => console.error('Error al actualizar comentario:', err)
        });
      }
    });
  }

}
