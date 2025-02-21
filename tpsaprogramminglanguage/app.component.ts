import { Component } from '@angular/core';

interface Burger {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cart: Burger[] = [];

  addToCart(burger: Burger): void {
    this.cart.push(burger);
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
  }

  checkout(): void {
    if (this.cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const total = this.cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Thank you for your order!\nTotal: $${total.toFixed(2)}\nYour burgers will be ready soon!`);
    this.cart = [];
  }
} 