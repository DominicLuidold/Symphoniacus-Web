// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Custom stuff
import { AppComponent } from './app.component';
import { DutyDetailsComponent } from './duty-details/duty-details.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material-module';
import { MusicalPieceDividerPipe } from './_pipes/musical-piece-divider.pipe';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WishDetailsComponent } from './wish-details/wish-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DutyDetailsComponent,
    HomeComponent,
    MusicalPieceDividerPipe,
    NavBarComponent,
    WishDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'duty/:dutyId', component: DutyDetailsComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
