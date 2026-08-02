import { Component, ViewChild } from '@angular/core';
import { BannerComponent } from '../../banner/banner.component';
import { RequestDialogComponent } from '../../request-dialog/request-dialog.component';
import { ProductCardComponent } from '../../product-card/product-card.component';

@Component({
  selector: 'app-home-page',
  imports: [BannerComponent, RequestDialogComponent, ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  @ViewChild(RequestDialogComponent) dialog!: RequestDialogComponent;

  onRequestSubmitted(text: string): void {
    void text;
  }
}
