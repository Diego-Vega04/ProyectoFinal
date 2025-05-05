import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CestaComponent } from './cesta/cesta.component';
import { UserComponent } from './user/user.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cesta', component: CestaComponent},
  {path: '*', redirectTo: ''},
  {path: '', component: PaginaPrincipalComponent  },
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
