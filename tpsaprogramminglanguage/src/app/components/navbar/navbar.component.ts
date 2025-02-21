import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav>
      <div class="logo">Tasty Burgers</div>
      <div class="nav-links">
        <a routerLink="/">Home</a>
        <a routerLink="/menu">Menu</a>
        <a routerLink="/contact">Contact</a>
        <a routerLink="/profile">Profile</a>
        <button (click)="onLoginClick.emit()">Login</button>
        <button (click)="onRegisterClick.emit()">Register</button>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  @Output() onLoginClick = new EventEmitter();
  @Output() onRegisterClick = new EventEmitter();
} 