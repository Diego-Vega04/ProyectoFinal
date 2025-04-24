import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './keycloak-init';
import { Keycloakguard } from './guards/keycloak.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
  ],
  providers: [{
    provide: APP_INITIALIZER, 
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  }, 
  KeycloakService, Keycloakguard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
