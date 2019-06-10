import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {SnotifyModule, SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  constructor(private authService: AuthService,
              private snotify: SnotifyService) { }

  public form = {
    email: null
  };

  ngOnInit() {
  }

  onSubmit() {
    this.snotify.info('Wait....', {timeout: 5000});
    this.authService.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.snotify.error(error.error.error)
    );
  }

  handleResponse(res) {
    this.snotify.success(res.data, {timeout: 0});
    this.form.email = null;
  }
}
