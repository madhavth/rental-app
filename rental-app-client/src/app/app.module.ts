import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then(
            (module) => module.HomeModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./modules/user/user.module').then(
            (module) => module.UserModule
          ),
      },
      {
        path: 'properties',
        loadChildren: () =>
          import('./modules/property/property.module').then(
            (module) => module.PropertyModule
          ),
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
