import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor, JwtInterceptor } from '@app/_helpers';
import { MusicalPieceDividerPipe } from '@app/_pipes';
import { AddDutyWishDialogComponent } from '@app/add-duty-wish-dialog/add-duty-wish-dialog.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { DeleteWishDialogComponent } from '@app/delete-wish-dialog/delete-wish-dialog.component';
import { DutyDetailsComponent } from '@app/duty-details/duty-details.component';
import { DutyOverviewComponent } from '@app/duty-overview/duty-overview.component';
import { HomeComponent } from '@app/home/home.component';
import { LoginComponent } from '@app/login/login.component';
import { MaterialModule } from '@app/material-module';
import { NavbarComponent } from '@app/navbar/navbar.component';
import { WishDetailsComponent } from '@app/wish-details/wish-details.component';
import { AddDateWishDialogComponent } from './add-date-wish-dialog/add-date-wish-dialog.component';
import { DateWishOverviewComponent } from './date-wish-overview/date-wish-overview.component';
import { EditDateWishDialogComponent } from './edit-date-wish-dialog/edit-date-wish-dialog.component';
import { EditDutyWishDialogComponent } from './edit-duty-wish-dialog/edit-duty-wish-dialog.component';
import { WishOverviewComponent } from './wish-overview/wish-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    DutyDetailsComponent,
    AddDutyWishDialogComponent,
    HomeComponent,
    LoginComponent,
    MusicalPieceDividerPipe,
    NavbarComponent,
    WishDetailsComponent,
    DutyOverviewComponent,
    DeleteWishDialogComponent,
    WishOverviewComponent,
    DateWishOverviewComponent,
    AddDateWishDialogComponent,
    EditDutyWishDialogComponent,
    EditDateWishDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'de-AT' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Intentionally empty
}
