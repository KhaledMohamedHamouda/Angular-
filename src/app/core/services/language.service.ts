import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) private PLATFORMID: string) {
    this.translate.addLangs(['ar', 'en']);
    // this.translate.setDefaultLang('en');
    this.translate.use('en');
    if (isPlatformBrowser(PLATFORMID)) {
      this.changeDirection('en')
    }
  }


  // todo   change language   
  changeLang(lang: string) {
    this.translate.use(lang)
    this.changeDirection(lang)
  }


  // todo   change direction   
  changeDirection(lang: string) {
    const direction = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', direction);
  }

}
