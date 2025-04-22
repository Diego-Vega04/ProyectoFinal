import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CestaComponent } from './cesta/cesta.component';

const routes: Routes = [
  {path: 'cesta', component: CestaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
