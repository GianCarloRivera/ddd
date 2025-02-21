import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="App">
      <app-navbar
        (onLoginClick)="isLoginOpen = true"
        (onRegisterClick)="isRegisterOpen = true"
      ></app-navbar>

      <router-outlet></router-outlet>

      <app-login-modal
        [isOpen]="isLoginOpen"
        (onClose)="isLoginOpen = false"
      ></app-login-modal>
      
      <app-register-modal
        [isOpen]="isRegisterOpen"
        (onClose)="isRegisterOpen = false"
      ></app-register-modal>
    </div>
  `
})
export class AppComponent {
  isLoginOpen = false;
  isRegisterOpen = false;
} 