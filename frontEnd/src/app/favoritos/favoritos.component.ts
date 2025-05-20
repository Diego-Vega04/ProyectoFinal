import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { Producto } from '../models/producto';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favoritos',
  standalone: false,
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit {

  favItems: Producto[] = [];
  usuarioDb!: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private favoritoService: FavoritosService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUsuario();

    this.userService.getByEmail(user.email).subscribe({
      next: (usuarioDb) => {
        this.usuarioDb = usuarioDb;
        const favsId = usuarioDb.favoritos?.id;
        if (favsId !== undefined) {
          this.favoritoService.getByUserId(favsId).subscribe({
            next: (favs) => {
              if (favs && favs.productos) {
                this.favItems = favs.productos.map(p => ({ ...p, cantidad: 1 }));
              } else {
                console.warn('Favoritos sin productos o datos nulos:', favs);
                this.favItems = [];
              }
            },
            error: (err) => {
              console.error('Error al cargar productos de favoritos', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener usuario', err);
      }
    })
  }

  vaciarFavoritos(): void {
    const user = this.authService.getUsuario();

    this.userService.getByEmail(user.email).subscribe({
      next: (usuarioDb) => {
        const favoritosId = usuarioDb.favoritos?.id;

        if (favoritosId !== undefined) {
          this.favoritoService.vaciarFavoritos(favoritosId).subscribe({
            next: () => {
              this.favItems = [];

              this.snackBar.open('Favoritos vaciados correctamente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'start',
                verticalPosition: 'bottom',
              });
            },
            error: (err) => {
              console.error('Error al vaciar favoritos', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener el usuario para vaciar favoritos', err);
      }
    });
  }


}
