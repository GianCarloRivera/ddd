import { Component } from '@angular/core';

interface Order {
  id: number;
  name: string;
  date: string;
}

@Component({
  selector: 'app-profile',
  template: `
    <section class="profile-section">
      <h2>Profile Information</h2>
      <div *ngIf="!isEditing" class="profile-info">
        <p><strong>Name:</strong> {{profile.name}}</p>
        <p><strong>Email:</strong> {{profile.email}}</p>
        <p><strong>Phone:</strong> {{profile.phone}}</p>
        <p><strong>Address:</strong> {{profile.address}}</p>
        <button (click)="isEditing = true">Edit Profile</button>
      </div>

      <div *ngIf="isEditing" class="profile-edit">
        <input [(ngModel)]="editedProfile.name" placeholder="Name">
        <input [(ngModel)]="editedProfile.email" type="email" placeholder="Email">
        <input [(ngModel)]="editedProfile.phone" type="tel" placeholder="Phone">
        <input [(ngModel)]="editedProfile.address" placeholder="Address">
        <button (click)="saveChanges()">Save Changes</button>
      </div>

      <div class="favorite-orders">
        <h3>Favorite Orders</h3>
        <div class="orders-list">
          <div *ngFor="let order of profile.favoriteOrders" class="order-item">
            <p>{{order.name}}</p>
            <small>Ordered on: {{order.date}}</small>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ProfileComponent {
  isEditing = false;
  
  profile = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Burger Street',
    favoriteOrders: [
      { id: 1, name: 'Classic Burger', date: '2024-03-15' },
      { id: 2, name: 'Cheese Burger', date: '2024-03-10' }
    ]
  };

  editedProfile = {...this.profile};

  saveChanges() {
    this.profile = {...this.editedProfile};
    this.isEditing = false;
  }
} 