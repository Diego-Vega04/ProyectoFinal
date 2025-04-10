import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Filtro2Component } from './filtro2/filtro2.component';

const routes: Routes = [
  { path: 'filtro2', component: Filtro2Component },
  { path: '', redirectTo: '/filtros', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
