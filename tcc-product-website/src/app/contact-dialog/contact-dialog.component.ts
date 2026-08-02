import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.generated';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-dialog.component.html'
})
export class ContactDialogComponent {
  @ViewChild('contactDialog') requestDialog!: ElementRef<HTMLDialogElement>;
  @Output() submitted = new EventEmitter<string>();

  firstName = '';
  surname = '';
  email = '';
  message = '';
  submitting = false;
  errorMessage = '';

  private readonly WEB3FORMS_ACCESS_KEY = environment.web3formsAccessKey;

  constructor(private http: HttpClient) { }

  open(): void {
    this.requestDialog.nativeElement.showModal();
  }

  close(): void {
    this.requestDialog.nativeElement.close();
  }

  onSubmit(): void {
    if (!this.firstName || !this.surname || !this.email || !this.message) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (!this.WEB3FORMS_ACCESS_KEY) {
      this.errorMessage = 'Form service is not configured right now. Please try again later.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const payload = {
      access_key: this.WEB3FORMS_ACCESS_KEY,
      'First Name': this.firstName,
      'Surname': this.surname,
      'Email': this.email,
      'Details': this.message,
    };

    this.http.post('https://api.web3forms.com/submit', payload).subscribe({
      next: () => {
        this.resetForm();
        this.submitting = false;
        this.close();
      },
      error: (err) => {
        this.errorMessage = 'Something went wrong. Please try again.';
        this.submitting = false;
      },
    });
  }

  private resetForm(): void {
    this.firstName = '';
    this.surname = '';
    this.email = '';
    this.message = '';
  }
}
