import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Oauth2Service } from '../../auth/oauth2.service';
import { ClickOutside } from 'ngxtension/click-outside';
import { UserProductService } from '../../shared/service/user-product.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { CartService } from '../../shop/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FaIconComponent, ClickOutside, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  oauth2Service = inject(Oauth2Service);
  productService = inject(UserProductService);
  cartService = inject(CartService);

  constructor(private router: Router) {}

  searchTerm: string = '';

  nbItemsInCart = 0;

  connectedUserQuery = this.oauth2Service.connectedUserQuery;

  categoryQuery = injectQuery(() => ({
    queryKey: ['categories'],
    queryFn: () => lastValueFrom(this.productService.findAllCategories()),
  }));

  login(): void {
    this.closeDropDownMenu();
    this.oauth2Service.login();
  }

  logout(): void {
    this.closeDropDownMenu();
    this.oauth2Service.logout();
  }

  isConnected(): boolean {
    return (
      this.connectedUserQuery?.status() === 'success' &&
      this.connectedUserQuery?.data()?.email !== this.oauth2Service.notConnected
    );
  }

  closeDropDownMenu() {
    const bodyElement = document.activeElement as HTMLBodyElement;
    if (bodyElement) {
      bodyElement.blur();
    }
  }

  closeMenu(menu: HTMLDetailsElement) {
    menu.removeAttribute('open');
  }

  ngOnInit(): void {
    this.listenToCart();
  }

  private listenToCart() {
    this.cartService.addedToCart.subscribe((productsInCart) => {
      this.nbItemsInCart = productsInCart.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
    });
  }

  searchProducts(event: Event) {
    event.preventDefault();
    // При сабміті форми перенаправляємо на /products з параметром name
    this.router.navigate(['/products'], { queryParams: { name: this.searchTerm } });
  }
}
