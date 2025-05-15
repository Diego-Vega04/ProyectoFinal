import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { Producto } from '../models/producto';
import { User } from '../models/user';

@Component({
  selector: 'app-favoritos',
  standalone: false,
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit{

  favItems: Producto[] = [];
  usuarioDb!: User;

  constructor(
      private authService: AuthService,
      private userService: UserService,
      private favoritoService: FavoritosService) { }

      ngOnInit(): void {
        const user = this.authService.getUsuario();
    
        this.userService.getByEmail(user.email).subscribe({
          next: (usuarioDb) => {
            this.usuarioDb = usuarioDb;
            const favsId = usuarioDb.favoritos?.id;
            if (favsId !== undefined) {
              this.favoritoService.getByUserId(favsId).subscribe({
                next: (favs) => {
                  this.favItems = favs.productos.map(p => ({ ...p, cantidad: 1 }));
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
}
