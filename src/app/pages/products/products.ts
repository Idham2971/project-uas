import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  qty: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss'],
})
export class ProductsComponent {
  cartService = inject(CartService);

  isCartOpen = false;
  showSuccessModal = false;

  products: Product[] = [
    {
      id: 1,
      name: 'Bayam Hijau Organik',
      price: 15000,
      image: 'https://placehold.co/300x200/2ecc71/white?text=Bayam',
      description: 'Segar, dipetik langsung dari kebun hidroponik.',
      qty: 1,
    },
    {
      id: 2,
      name: 'Wortel Brastagi',
      price: 12000,
      image: 'https://placehold.co/300x200/e67e22/white?text=Wortel',
      description: 'Kaya vitamin A, manis dan renyah.',
      qty: 1,
    },
    {
      id: 3,
      name: 'Brokoli Segar',
      price: 28000,
      image: 'https://placehold.co/300x200/27ae60/white?text=Brokoli',
      description: 'Kualitas super, bebas pestisida.',
      qty: 1,
    },
    {
      id: 4,
      name: 'Kentang Dieng',
      price: 18000,
      image: 'https://placehold.co/300x200/f1c40f/white?text=Kentang',
      description: 'Cocok untuk digoreng atau direbus.',
      qty: 1,
    },
    {
      id: 5,
      name: 'Tomat Merah',
      price: 8000,
      image: 'https://placehold.co/300x200/c0392b/white?text=Tomat',
      description: 'Juicy dan segar, pas untuk sambal.',
      qty: 1,
    },
    {
      id: 6,
      name: 'Cabai Rawit Merah',
      price: 65000,
      image: 'https://placehold.co/300x200/e74c3c/white?text=Cabai',
      description: 'Pedas nampol, kualitas terbaik.',
      qty: 1,
    },
    {
      id: 7,
      name: 'Bawang Merah Brebes',
      price: 35000,
      image: 'https://placehold.co/300x200/9b59b6/white?text=Bawang+Merah',
      description: 'Ukuran besar, wangi dan gurih.',
      qty: 1,
    },
    {
      id: 8,
      name: 'Bawang Putih Kating',
      price: 40000,
      image: 'https://placehold.co/300x200/bdc3c7/black?text=Bawang+Putih',
      description: 'Siung besar dan aroma kuat.',
      qty: 1,
    },
    {
      id: 9,
      name: 'Terong Ungu',
      price: 10000,
      image: 'https://placehold.co/300x200/8e44ad/white?text=Terong',
      description: 'Tekstur lembut, enak untuk balado.',
      qty: 1,
    },
    {
      id: 10,
      name: 'Timun Kyuri',
      price: 12000,
      image: 'https://placehold.co/300x200/2ecc71/white?text=Timun',
      description: 'Renyah dan segar, cocok untuk lalapan.',
      qty: 1,
    },
    {
      id: 11,
      name: 'Kol / Kubis',
      price: 8000,
      image: 'https://placehold.co/300x200/a29bfe/white?text=Kubis',
      description: 'Segar dan padat, cocok untuk sop.',
      qty: 1,
    },
    {
      id: 12,
      name: 'Paprika Merah',
      price: 75000,
      image: 'https://placehold.co/300x200/c0392b/white?text=Paprika',
      description: 'Manis dan renyah, kaya vitamin C.',
      qty: 1,
    },
    {
      id: 13,
      name: 'Sawi Hijau (Caisim)',
      price: 6000,
      image: 'https://placehold.co/300x200/27ae60/white?text=Sawi',
      description: 'Daun hijau segar, cepat masak.',
      qty: 1,
    },
    {
      id: 14,
      name: 'Labu Siam',
      price: 5000,
      image: 'https://placehold.co/300x200/f1c40f/white?text=Labu',
      description: 'Muda dan manis, enak dilodeh.',
      qty: 1,
    },
    {
      id: 15,
      name: 'Jagung Manis',
      price: 9000,
      image: 'https://placehold.co/300x200/f39c12/white?text=Jagung',
      description: 'Biji padat, manis alami tanpa gula.',
      qty: 1,
    },
  ];

  decreaseQty(item: Product) {
    if (item.qty > 1) item.qty--;
  }

  increaseQty(item: Product) {
    item.qty++;
  }

  addToCart(item: Product) {
    this.cartService.addToCart(item);
    this.isCartOpen = true;
    item.qty = 1;
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  get cartItems() {
    return this.cartService.getCartItems();
  }

  get cartTotal() {
    return this.cartService.getTotalPrice();
  }

  checkout() {
    this.showSuccessModal = true;
    this.cartService.clearCart();
    this.isCartOpen = false;
  }

  closeModal() {
    this.showSuccessModal = false;
  }
}
