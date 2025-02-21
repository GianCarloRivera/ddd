import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BurgerService, Burger } from '../services/burger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  @Input() cart: Burger[] = [];
  @Output() removeFromCartEvent = new EventEmitter<number>();
  @Output() checkoutEvent = new EventEmitter<void>();

  constructor(private burgerService: BurgerService) {}

  get total(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  removeFromCart(index: number): void {
    this.removeFromCartEvent.emit(index);
  }

  async checkout(): Promise<void> {
    if (this.cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      await this.burgerService.createOrder({
        items: this.cart,
        total: this.total
      }).toPromise();

      alert(`Thank you for your order!\nTotal: $${this.total.toFixed(2)}\nYour burgers will be ready soon!`);
      this.checkoutEvent.emit();
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  }
} 