import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbInputModule, NbButtonModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { ProtectedComponent } from './protected/protected.component';

@NgModule({
  declarations: [SignUpComponent, SignInComponent, ProtectedComponent],
  imports: [
    CommonModule,
    NbInputModule,
    NbButtonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
})
export class PagesModule {}
