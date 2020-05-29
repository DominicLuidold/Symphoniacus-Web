import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models/user';
import { AuthenticationService } from '@app/_services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    // Intentionally empty
  }

  logout() {
    this.authenticationService.logout();
  }
}
