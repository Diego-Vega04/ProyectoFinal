import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasDestacadasComponent } from "./components/categorias-destacadas/categorias-destacadas.component";
import { OfertasDestacadasComponent } from "./components/ofertas-destacadas/ofertas-destacadas.component";
import { BannerPrincipalComponent } from "./components/banner-principal/banner-principal.component"; 
import { MasVendidosComponent } from "./components/mas-vendidos/mas-vendidos.component";
import { OfertasTopComponent } from "./components/ofertas-top/ofertas-top.component";
import { InfoComponent } from "./components/info/info.component";
import { BasadoNavegacionComponent } from "./components/basado-navegacion/basado-navegacion.component";
import { NoPerderseComponent } from "./components/no-perderse/no-perderse.component";
import { BannerInferiorComponent } from "./components/banner-inferior/banner-inferior.component";
import { MarcasComponent } from "./components/marcas/marcas.component";
import { IconosComponent } from "./components/iconos/iconos.component";

@Component({
  selector: 'pagina-principal',
  standalone: true,
  imports: [
    CommonModule,
    CategoriasDestacadasComponent,
    OfertasDestacadasComponent,
    BannerPrincipalComponent,
    MasVendidosComponent,
    OfertasTopComponent,
    InfoComponent,
    BasadoNavegacionComponent,
    NoPerderseComponent,
    BannerInferiorComponent,
    MarcasComponent,
    IconosComponent
  ],
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent {}
