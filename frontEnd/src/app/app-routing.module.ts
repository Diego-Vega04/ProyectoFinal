import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withViewTransitions } from '@angular/router';
import { CestaComponent } from './cesta/cesta.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { Filtro2Component } from './filtro/filtro2.component';
import { ProductoComponent } from './producto/producto.component';
import { ListaUsersComponent } from './lista-users/lista-users.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

const routes: Routes = [
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'cesta', component: CestaComponent},
  {path: 'favoritos', component: FavoritosComponent},
  {path: 'producto/:id', component: ProductoComponent},
  {path: 'admin-users', component: ListaUsersComponent, canActivate: [AuthGuard],  data: { roles: ['admin'] }},
  {path: '*', redirectTo: ''},
  {path: '', component: Filtro2Component  },
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withViewTransitions())
  ]
})
export class AppRoutingModule { }
