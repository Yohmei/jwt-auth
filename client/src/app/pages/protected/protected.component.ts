import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss'],
})
export class ProtectedComponent implements OnInit {
  constructor(private auth_service: AuthService) {}

  ngOnInit(): void {
    this.auth_service.visit_protected();
  }
}
