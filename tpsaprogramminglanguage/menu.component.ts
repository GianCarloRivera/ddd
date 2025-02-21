import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { BurgerService, Burger } from '../services/burger.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  @Output() addToCartEvent = new EventEmitter<Burger>();
  burgers: Burger[] = [];
  loading = true;
  error: string | null = null;

  constructor(private burgerService: BurgerService) {}

  ngOnInit() {
    this.burgerService.getBurgers().subscribe({
      next: (data) => {
        this.burgers = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load burgers';
        this.loading = false;
      }
    });
  }

  addToCart(burger: Burger): void {
    this.addToCartEvent.emit(burger);
  }
} 