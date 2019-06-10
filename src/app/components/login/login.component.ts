import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {JwtTokenService} from '../../services/jwt-token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private tokenService: JwtTokenService,
              private router: Router) { }

  public form = {
    email: null,
    password: null,
  };

  public error = null;

  ngOnInit() {
  }

  onSubmit() {
    this.error = null;
    this.authService.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.tokenService.handle(data.access_token);
    this.authService.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.error;
  }

}
