import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from './services/auth.service';
import { TestService } from './services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private test_service: TestService,
    private auth_service: AuthService,
    private router: Router,
    private user: User | null = null;
  ) { }

  set_user = (user: User) => {
    this.user = user;
  };

  ngOnInit(): void {
    this.test_service.test();
  }

  ngOnChanges() {
    console.log(this.auth_service.is_token_expired());
    if (this.auth_service.is_token_expired()) {
      this.auth_service.logout();
      this.router.navigate(['']);
    } else this.router.navigate(['protected']);
  }
}
