import { Component } from '@angular/core';

interface Burger {
  id: number;
  name: string;
  price: string;
  image: string;
}

@Component({
  selector: 'app-menu',
  template: `
    <section id="menu" class="menu-section">
      <h2>Our Menu</h2>
      <div class="burger-grid">
        <div *ngFor="let burger of burgers" class="burger-card">
          <img [src]="burger.image" [alt]="burger.name">
          <h3>{{burger.name}}</h3>
          <p>{{burger.price}}</p>
        </div>
      </div>
    </section>
  `
})
export class MenuComponent {
  burgers: Burger[] = [
    {
      id: 1,
      name: 'Classic Burger',
      price: '₱100.00',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format'
    },
    {
      id: 2,
      name: 'Cheese Burger',
      price: '₱150.00',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format'
    },
    {
      id: 3,
      name: 'Bacon Burger',
      price: '₱200.00',
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&auto=format'
    }
  ];
} 