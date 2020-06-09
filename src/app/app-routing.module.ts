import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
import { DateWishOverviewComponent } from '@app/date-wish-overview/date-wish-overview.component';
import { DutyDetailsComponent } from '@app/duty-details/duty-details.component';
import { DutyOverviewComponent } from '@app/duty-overview/duty-overview.component';
import { HomeComponent } from '@app/home/home.component';
import { LoginComponent } from '@app/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'duty-overview', component: DutyOverviewComponent, canActivate: [AuthGuard] },
  { path: 'date-request-overview', component: DateWishOverviewComponent, canActivate: [AuthGuard] },
  { path: 'duty/:dutyId', component: DutyDetailsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
