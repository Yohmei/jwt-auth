import { AuthService } from './../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  sign_in_form: FormGroup;

  constructor(
    private form_builder: FormBuilder,
    private user_service: AuthService
  ) {
    this.sign_in_form = this.form_builder.group({
      username: '',
      password: '',
    });
  }

  on_submit(user: string) {
    this.user_service.login(user);
  }

  ngOnInit(): void {}
}
