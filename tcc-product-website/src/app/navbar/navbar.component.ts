import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../cart.service';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ContactDialogComponent],
  templateUrl: './navbar.component.html',
})

export class NavbarComponent {
  @ViewChild(ContactDialogComponent) dialog!: ContactDialogComponent;

  isMobileMenuOpen = false;

  constructor(
    public cartService: CartService,
    private router: Router,
  ) {}

  get isHomePage(): boolean {
    return this.router.url === '/';
  }

  openContactDialog(): void {
    this.isMobileMenuOpen = false;
    this.dialog.open();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
