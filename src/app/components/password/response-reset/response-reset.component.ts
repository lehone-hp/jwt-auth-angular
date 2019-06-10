import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = [];
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    reset_token: null
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private notify: SnotifyService) {
    route.queryParams.subscribe(params => {
      this.form.reset_token = params.token;
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(res) {
    this.notify.confirm('Done, Now login with new password', {
      buttons: [
        {
          text: 'Ok',
          action: toster => {
            this.router.navigateByUrl('/login');
            this.notify.remove(toster.id);
          }
        }
      ]
    });

  }

  handleError(err) {
    this.error = err.error.errors;
  }

}
