import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {JwtTokenService} from '../../services/jwt-token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private tokenService: JwtTokenService) { }

  ngOnInit() {
    this.authService.authStatus.subscribe(
      value => this.loggedIn = value
    );
  }

  logout(event: MouseEvent) {
    event.preventDefault(); // prevent href from working
    this.tokenService.removeToken();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}
