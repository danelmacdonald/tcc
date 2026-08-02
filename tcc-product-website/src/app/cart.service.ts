import { Injectable, computed, signal } from '@angular/core';

export interface CartItem {
  name: string;
  price: string;
  image: string;
  quantity: number;
}

const CART_STORAGE_KEY = 'tcc-cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>(this.loadItems());

  readonly items = this.itemsSignal.asReadonly();
  readonly itemCount = computed(() =>
    this.itemsSignal().reduce((total, item) => total + item.quantity, 0),
  );
  readonly subtotal = computed(() =>
    this.itemsSignal().reduce(
      (total, item) => total + this.parsePrice(item.price) * item.quantity,
      0,
    ),
  );

  addItem(item: Omit<CartItem, 'quantity'>): void {
    const items = [...this.itemsSignal()];
    const existingItem = items.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({ ...item, quantity: 1 });
    }

    this.itemsSignal.set(items);
    this.persistItems();
  }

  updateQuantity(name: string, quantity: number): void {
    const items = this.itemsSignal()
      .map((item) =>
        item.name === name
          ? { ...item, quantity }
          : item,
      )
      .filter((item) => item.quantity > 0);

    this.itemsSignal.set(items);
    this.persistItems();
  }

  removeItem(name: string): void {
    const items = this.itemsSignal().filter(
      (item) => item.name !== name,
    );

    this.itemsSignal.set(items);
    this.persistItems();
  }

  clearCart(): void {
    this.itemsSignal.set([]);
    this.persistItems();
  }

  private loadItems(): CartItem[] {
    if (typeof window === 'undefined') {
      return [];
    }

    const storedItems = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedItems) {
      return [];
    }

    try {
      return JSON.parse(storedItems) as CartItem[];
    } catch {
      return [];
    }
  }

  private persistItems(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.itemsSignal()));
  }

  private parsePrice(price: string): number {
    return Number(price.replace(/[^0-9.]/g, '')) || 0;
  }
}
