import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TotalcasesComponent } from './totalcases/totalcases.component';
import { SelectcountryComponent } from './selectcountry/selectcountry.component';
import { I18nModule } from './i18n/i18n.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TotalcasesComponent,
    SelectcountryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    I18nModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
