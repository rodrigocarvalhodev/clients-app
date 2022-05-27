import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsService } from './clients.service';
import { ClientsModule } from './clients/clients.module';
import { HomeComponent } from './home/home.component';
import { TemplateModule } from './template/template.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceProvidedModule } from './service-provided/service-provided.module';
import { ProvidedService } from './provided.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    ClientsModule,
    HttpClientModule,
    ServiceProvidedModule,
  ],
  providers: [
    ClientsService,
    ProvidedService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
