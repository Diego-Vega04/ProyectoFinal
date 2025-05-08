import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CestaComponent } from './cesta/cesta.component';
import { UserComponent } from './user/user.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { Filtro2Component } from './filtro/filtro2.component';

const routes: Routes = [
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'cesta', component: CestaComponent},
  {path: '*', redirectTo: ''},
  {path: '', component: Filtro2Component  },
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
