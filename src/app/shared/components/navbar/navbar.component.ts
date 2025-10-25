import { Component, OnInit } from '@angular/core';
// ...existing code...
import { FlowbiteService } from '../../../core/services/FlowbiteService.service';
import { RouterLink } from "@angular/router";
import { RouterLinkActive } from "@angular/router"; // changed code
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/services/language.service';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  // providers: [FlowbiteService] // removed because service is providedIn: 'root'
})

export class NavbarComponent implements OnInit {

  islogin: boolean = false;
  // todo  link pages
  padges: { path: string, title: string }[] = [
    { path: 'home', title: 'navbar.Home' },
    { path: 'products', title: 'navbar.Products' },
    { path: 'categories', title: 'navbar.Categories' },
    { path: 'cart', title: 'navbar.Cart' },
    { path: 'brands', title: 'navbar.Brands' },
  ];
  // todo auth pages
  auth_padges: { path: string, title: string }[] = [
    { path: 'login', title: 'navbar.Login' },
    { path: 'register', title: 'navbar.Register' },
  ];

  constructor(private flowbiteService: FlowbiteService, private authService: AuthService, public languageService: LanguageService) { }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      // guard against undefined flowbite
      if (typeof (window as any).initFlowbite === 'function') {
        (window as any).initFlowbite();
      }
    });

    this.authService.behaviorSubject.subscribe({
      next: (user) => {
        console.log(user, 'navbar')
        if (user != null) {
          this.islogin = true;
        } else {
          this.islogin = false;
        }
      }
    })
  }

  //todo calling logout  function

  Logout() {
    this.authService.Logout()
  }


}
