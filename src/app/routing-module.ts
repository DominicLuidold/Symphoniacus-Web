import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
import { DutyDetailsComponent } from '@app/duty-details/duty-details.component';
import { HomeComponent } from '@app/home/home.component';
import { LoginComponent } from '@app/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'duty/:dutyId', component: DutyDetailsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const RoutingModule = RouterModule.forRoot(routes);
