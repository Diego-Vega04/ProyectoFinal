import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
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
import { Filtro2Component } from './filtro/filtro2.component';
import { UserComponent } from './user/user.component';
import { CestaComponent } from './cesta/cesta.component';

import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReviewDialogComponent } from './producto/review-dialog/review-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UserComponent,
    ProductoComponent,
    CestaComponent,
    ReviewDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    Filtro2Component,
    AuthModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    
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
