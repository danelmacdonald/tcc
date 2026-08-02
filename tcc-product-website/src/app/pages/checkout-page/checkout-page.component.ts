import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../cart.service';
import { environment } from '../../../environments/environment.generated';

@Component({
  selector: 'app-checkout-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout-page.component.html',
})
export class CheckoutPageComponent {
  private readonly cartService = inject(CartService);
  private readonly http = inject(HttpClient);
  private readonly web3FormsAccessKey = environment.web3formsAccessKey;

  firstName = '';
  surname = '';
  email = '';
  notes = '';
  orderPlaced = signal(false);
  submitting = false;
  errorMessage = '';

  readonly items = this.cartService.items;
  readonly subtotal = this.cartService.subtotal;
  readonly shippingFee = computed(() => (this.items().length > 0 ? 75 : 0));
  readonly total = computed(() => this.subtotal() + this.shippingFee());

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.name, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.name, item.quantity - 1);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.name);
  }

  placeOrder(): void {
    if (!this.firstName || !this.surname || !this.email || this.items().length === 0) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    if (!this.web3FormsAccessKey) {
      this.errorMessage = 'Form service is not configured right now. Please try again later.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const orderLines = this.items()
      .map((item) => `${item.quantity} x ${item.name} - ${item.price}`)
      .join('\n');

    const payload = {
      access_key: this.web3FormsAccessKey,
      subject: `New order from ${this.firstName} ${this.surname}`,
      'First Name': this.firstName,
      Surname: this.surname,
      Email: this.email,
      Order: orderLines,
      'Product Total': `R${this.total().toFixed(2)}`,
      Notes: this.notes || 'None',
    };

    this.http.post('https://api.web3forms.com/submit', payload).subscribe({
      next: () => {
        this.submitting = false;
        this.orderPlaced.set(true);
        this.cartService.clearCart();
        this.resetForm();
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = 'Something went wrong. Please try again.';
      },
    });
  }

  private resetForm(): void {
    this.firstName = '';
    this.surname = '';
    this.email = '';
    this.notes = '';
  }
}
