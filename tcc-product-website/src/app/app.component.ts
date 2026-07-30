import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { BannerComponent } from './banner/banner.component';
import { RequestDialogComponent } from './request-dialog/request-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, BannerComponent, RequestDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'tcc-product-website';

  @ViewChild(RequestDialogComponent) dialog!: RequestDialogComponent;

  onRequestSubmitted(text: string): void {
    // handle it here — e.g. call an API, show a toast, etc.
  }
}
