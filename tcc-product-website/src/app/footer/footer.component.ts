import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ContactDialogComponent, RouterLink],
  templateUrl: './footer.component.html',
})

export class FooterComponent {
  @ViewChild(ContactDialogComponent) dialog!: ContactDialogComponent;

  constructor(private router: Router) { }

  get isHomePage(): boolean {
    return this.router.url === '/';
  }

  onRequestSubmitted(text: string): void {
    void text;
  }

}
