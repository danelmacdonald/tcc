import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { BannerComponent } from './banner/banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, BannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tcc-product-website';
}
