import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  template: `
    <div *ngIf="isOpen" class="modal">
      <div class="modal-content">
        <span class="close" (click)="onClose.emit()">&times;</span>
        <h2>Login</h2>
        <form (ngSubmit)="handleSubmit()">
          <input type="email" placeholder="Email" required>
          <input type="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  `
})
export class LoginModalComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter();

  handleSubmit() {
    // Add login logic here
    console.log('Login attempt');
    this.onClose.emit();
  }
} 