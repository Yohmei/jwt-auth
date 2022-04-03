import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  sign_up_form: FormGroup;

  constructor(
    private form_builder: FormBuilder,
    private users_service: AuthService
  ) {
    this.sign_up_form = this.form_builder.group({
      name: '',
      username: '',
      password: '',
    });
  }

  on_submit(user: string) {
    this.users_service.register(user);
  }

  ngOnInit(): void {}
}
