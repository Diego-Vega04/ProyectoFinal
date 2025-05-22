import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductoComponent } from './producto/producto.component';
import { Filtro2Component } from './filtro/filtro2.component';
import { UserComponent } from './user/user.component';
import { CestaComponent } from './cesta/cesta.component';

import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReviewDialogComponent } from './producto/review-dialog/review-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { ListaUsersComponent } from './lista-users/lista-users.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaUsersComponent,
    FooterComponent,
    HeaderComponent,
    UserComponent,
    ProductoComponent,
    CestaComponent,
    ReviewDialogComponent,
    FavoritosComponent,
    VistaAdminComponent
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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
