import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { environment } from '../../environments/environment';
import { NgxsModule } from '@ngxs/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserState } from '../shared/stores/user/user.state';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    BrowserModule,
    CoreRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    NgxsModule.forRoot([UserState], {
      developmentMode: !environment.production,
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [CoreComponent],
})
export class CoreModule {}
