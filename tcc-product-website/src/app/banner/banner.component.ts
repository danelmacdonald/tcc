import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.generated';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './banner.component.html',
})
export class BannerComponent {
  email = '';
  submitting = false;
  errorMessage = '';
  successMessage = '';

  private readonly web3FormsAccessKey = environment.web3formsAccessKey;

  constructor(private http: HttpClient) {}

  subscribe(): void {
    if (!this.email) {
      this.errorMessage = 'Please enter your email.';
      this.successMessage = '';
      return;
    }

    if (!this.web3FormsAccessKey) {
      this.errorMessage = 'Form service is not configured right now. Please try again later.';
      this.successMessage = '';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = {
      access_key: this.web3FormsAccessKey,
      subject: 'Newsletter notify request',
      Action: 'notify',
      Email: this.email,
    };

    this.http.post('https://api.web3forms.com/submit', payload).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Thanks, we will notify you.';
        this.email = '';
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = 'Something went wrong. Please try again.';
      },
    });
  }
}
