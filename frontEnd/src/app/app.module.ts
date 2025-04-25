import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// COMPONENTES STANDALONE (van en imports)
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { BannerInferiorComponent } from './pagina-principal/components/banner-inferior/banner-inferior.component';
import { BannerPrincipalComponent } from './pagina-principal/components/banner-principal/banner-principal.component';
import { CategoriasDestacadasComponent } from './pagina-principal/components/categorias-destacadas/categorias-destacadas.component';
import { BasadoNavegacionComponent } from './pagina-principal/components/basado-navegacion/basado-navegacion.component';
import { IconosComponent } from './pagina-principal/components/iconos/iconos.component';
import { InfoComponent } from './pagina-principal/components/info/info.component';
import { MarcasComponent } from './pagina-principal/components/marcas/marcas.component';
import { MasVendidosComponent } from './pagina-principal/components/mas-vendidos/mas-vendidos.component';
import { NoPerderseComponent } from './pagina-principal/components/no-perderse/no-perderse.component';
import { OfertasDestacadasComponent } from './pagina-principal/components/ofertas-destacadas/ofertas-destacadas.component';
import { OfertasTopComponent } from './pagina-principal/components/ofertas-top/ofertas-top.component';
import { ProductoComponent } from './producto/producto.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    
    PaginaPrincipalComponent,
    BannerInferiorComponent,
    BannerPrincipalComponent,
    CategoriasDestacadasComponent,
    BasadoNavegacionComponent,
    IconosComponent,
    InfoComponent,
    MarcasComponent,
    MasVendidosComponent,
    NoPerderseComponent,
    OfertasDestacadasComponent,
    OfertasTopComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
