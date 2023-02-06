import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HeaderComponent} from './common/header/header.component';
import {FooterComponent} from './common/footer/footer.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {UserService} from './services/user.service';
import {UserAuthGuard} from './AuthGuard/user-auth.guard';
import {HeaderInterceptor} from './interceptor/header.interceptor';
import {HomeModule} from './modules/home/home.module';
import {AdminModule} from './modules/admin/admin.module';
import {AdminComponent} from './pages/admin/admin.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

function initializeAppFactory(userService: UserService): () => void {
  return () => {
    const localStorageState = localStorage.getItem('USER_STATE');
    if (localStorageState) {
      userService.setUserState(JSON.parse(localStorageState));
    }
  };
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
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
      {
        path: 'admin',
        loadChildren: () =>
          import('./modules/admin/admin.module').then(
            (module) => module.AdminModule
          ),
      },
      {
        path: 'schedules',
        loadChildren: () =>
          import('./modules/schedules/schedules.module').then(
            (module) => module.SchedulesModule
          ),
      },
    ]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [UserService, UserAuthGuard],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
