// Angular modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Custom stuff
import { AppComponent } from './app.component';
import { DutyDetailsComponent } from './duty-details/duty-details.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material-module';
import { MusicalPieceDividerPipe } from './_pipes/musical-piece-divider.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { RoutingModule } from './routing-module';
import { WishDetailsComponent } from './wish-details/wish-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DutyDetailsComponent,
    HomeComponent,
    LoginComponent,
    MusicalPieceDividerPipe,
    NavbarComponent,
    WishDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
