import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart.service';
import { RequestDialogComponent } from '../../request-dialog/request-dialog.component';

@Component({
  selector: 'app-product-detail-page',
  imports: [CommonModule, RequestDialogComponent],
  templateUrl: './product-detail-page.component.html',
})

export class ProductDetailPageComponent implements OnInit {
  @ViewChild(RequestDialogComponent) dialog!: RequestDialogComponent;
  addToCartMessage = '';

  onRequestSubmitted(text: string): void {
    void text;
  }

  productName!: string;
  productPrice!: string;
  images: string[] = [];
  selectedImage = '';

  private readonly productImages: Record<string, string[]> = {
    'Bottle Phone Charm': [
      'products/bottle-phone-charm/20260705_134242.jpg',
      'products/bottle-phone-charm/20260705_134624.jpg',
      'products/bottle-phone-charm/20260705_134949.jpg',
      'products/bottle-phone-charm/20260705_135056.jpg',
      'products/bottle-phone-charm/20260705_135211.jpg',
    ],
    'Doughnut Kitty Keychain': [
      'products/doughnut-kitty-keychain/20260705_143023.jpg',
      'products/doughnut-kitty-keychain/20260705_143608.jpg',
      'products/doughnut-kitty-keychain/20260705_143728.jpg',
      'products/doughnut-kitty-keychain/20260705_143827.jpg',
      'products/doughnut-kitty-keychain/20260705_143917.jpg',
      'products/doughnut-kitty-keychain/20260705_144018.jpg',
    ],
    'Flower Charm Bracelet': [
      'products/flower-charm-bracelet/20260705_131728.jpg',
      'products/flower-charm-bracelet/20260705_131744.jpg',
      'products/flower-charm-bracelet/20260705_131753.jpg',
      'products/flower-charm-bracelet/20260705_131801.jpg',
      'products/flower-charm-bracelet/20260705_132056.jpg',
      'products/flower-charm-bracelet/20260705_132129.jpg',
      'products/flower-charm-bracelet/20260705_132535.jpg',
      'products/flower-charm-bracelet/20260705_132640.jpg',
    ],
    'Game Controller Keychain': [
      'products/game-controller-keychain/20260705_130120(1).jpg',
      'products/game-controller-keychain/20260705_130542.jpg',
      'products/game-controller-keychain/20260705_130616.jpg',
      'products/game-controller-keychain/20260705_130755.jpg',
      'products/game-controller-keychain/20260705_130845.jpg',
      'products/game-controller-keychain/20260705_130946.jpg',
    ],
    'Hair Clip': [
      'products/hair-clip/20260722_135548.jpg',
      'products/hair-clip/20260722_135636.jpg',
      'products/hair-clip/20260722_135651.jpg',
      'products/hair-clip/20260722_135811.jpg',
    ],
    'Headphone Keychain': [
      'products/headphone-keychain/20260705_141232.jpg',
      'products/headphone-keychain/20260705_141846.jpg',
      'products/headphone-keychain/20260705_142106.jpg',
      'products/headphone-keychain/20260705_142210.jpg',
      'products/headphone-keychain/20260705_142412.jpg',
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.productName = this.route.snapshot.paramMap.get('name')!;
    this.productPrice = this.route.snapshot.paramMap.get('price')!;
    this.images = this.productImages[this.productName] ?? [];

    this.selectedImage = this.images[0] ?? '';
  }

  addToCart(): void {
    this.cartService.addItem({
      name: this.productName,
      price: this.productPrice,
      image: this.selectedImage,
    });

    this.addToCartMessage = `${this.productName} added to cart`;
  }
}
