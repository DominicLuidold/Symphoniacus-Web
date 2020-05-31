import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor, JwtInterceptor } from '@app/_helpers';
import { MusicalPieceDividerPipe } from '@app/_pipes';
import { AppComponent } from '@app/app.component';
import { DutyDetailsComponent } from '@app/duty-details/duty-details.component';
import { DutyWishDialogComponent } from '@app/duty-wish-dialog/duty-wish-dialog.component';
import { HomeComponent } from '@app/home/home.component';
import { LoginComponent } from '@app/login/login.component';
import { MaterialModule } from '@app/material-module';
import { NavbarComponent } from '@app/navbar/navbar.component';
import { RoutingModule } from '@app/routing-module';
import { WishDetailsComponent } from '@app/wish-details/wish-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DutyDetailsComponent,
    DutyWishDialogComponent,
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
export class AppModule {
  // Intentionally empty
}
