import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Burger {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Order {
  items: Burger[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class BurgerService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getBurgers(): Observable<Burger[]> {
    return this.http.get<Burger[]>(`${this.apiUrl}/burgers`);
  }

  createOrder(order: Order): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, order);
  }
} 