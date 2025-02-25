import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  private readonly renderer2 = inject(RendererFactory2).createRenderer(null,null);

  constructor(private translateService:TranslateService ,
    @Inject(PLATFORM_ID) private platId:object) { 
    if(isPlatformBrowser(this.platId)){ // Browser
      
      // this language will be used as a fallback when a translation isn't found in the current language this._TranslateService.setDefaultLang(  'en'  );
        //1- set default lang
        this.translateService.setDefaultLang('en')
        //2- get lang from localStorage 
        const savedLang  = localStorage.getItem('lang'); 
        //3- use language if found
        if(savedLang){
          this.translateService.use(  savedLang  );
        }
           
         //to change direction
        this.changeDirection()
   }
   
  }


  changeDirection():void {
    if(localStorage.getItem('lang') === 'en'){
          // dir ltr
        //  document.documentElement.dir = 'ltr';
        this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
        this.renderer2.setAttribute(document.documentElement, 'lang', 'en');

    }
    else if (localStorage.getItem('lang') === 'ar') {
      //dir rtl
      // document.documentElement.dir = 'rtl';
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');

    }


   }


   changeLangTranslate(lang:string):void{
      //save to local storate
      localStorage.setItem('lang', lang);

      //use lang 
      this.translateService.use(  lang  );
      
      // change direction
      this.changeDirection();
   }
}
