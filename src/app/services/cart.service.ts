import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartItems.asObservable();

  addToCart(product: any) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.qty += product.qty; // Update jika barang sudah ada
    } else {
      currentItems.push({ ...product }); // Tambah baru
    }

    this.cartItems.next([...currentItems]); // Trigger update
  }

  getCartItems() {
    return this.cartItems.value;
  }

  getTotalPrice() {
    return this.cartItems.value.reduce((total, item) => total + item.price * item.qty, 0);
  }

  clearCart() {
    this.cartItems.next([]);
  }
}
