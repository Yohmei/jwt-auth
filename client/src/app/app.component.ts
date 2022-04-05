import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TestService } from './services/test.service';
import { User } from './types/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnChanges {
  public user: User | null = null;

  constructor(
    private test_service: TestService,
    private auth_service: AuthService,
    private router: Router
  ) {}

  set_user = (user: User | null) => {
    this.user = user;
  };

  ngOnInit(): void {
    this.test_service.test();
    this.auth_service.get_user_observable().subscribe((user) => {
      console.log('subscribed to user');
      this.set_user(user);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.user);
    if (this.auth_service.is_token_expired()) {
      this.auth_service.logout();
      this.router.navigate(['']);
    } else this.router.navigate(['protected']);
  }
}
