import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss'],
})
export class ProtectedComponent implements OnInit {
  public _user_name: string;

  public get_user_name(): string {
    return this._user_name;
  }

  public set_user_name(value: string) {
    this._user_name = value;
  }

  public logout() {
    this.auth_service.logout();
  }

  constructor(private auth_service: AuthService) {
    this._user_name = '';
    this.set_user_name = this.set_user_name.bind(this);
  }

  ngOnInit(): void {
    this.auth_service.visit_protected(this.set_user_name);
  }
}
