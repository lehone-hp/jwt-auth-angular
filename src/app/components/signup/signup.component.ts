import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {JwtTokenService} from '../../services/jwt-token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService,
              private tokenService: JwtTokenService,
              private router: Router) { }

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public error = [];

  ngOnInit() {
  }

  onSubmit() {
    this.error = [];
    this.authService.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.tokenService.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

}
