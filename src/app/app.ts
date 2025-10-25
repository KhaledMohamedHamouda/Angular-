import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { CartLoadingComponent } from "./shared/cart-loading/cart-loading.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CartLoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('E-commerce');

  constructor(private authService: AuthService, private cookieService: CookieService) { }
  private platformId = inject(PLATFORM_ID);
  // todo    inject authservice ====>>> (login , register , logout , decode ) 
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // const token = localStorage.getItem('token')
      const token = this.cookieService.get('token');
      if (token) {
        this.authService.decodedToken(token)
        console.log(token);
      }
    }
  }

  
}
