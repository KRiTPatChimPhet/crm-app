import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { concatMap } from 'rxjs';
import { ConfigService } from './core/config/config.service';
import { LiffService } from './core/line/liff.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { GlobalErrorHandler } from './global.errorhandler';

export const configFactory = (
  configService: ConfigService,
  liffService: LiffService
) => {
  return () =>
    configService.loadConfig().pipe(
      concatMap(() => {
        const liffId = configService.getConfigByKey('liffId');
        return liffService.init(liffId as string);
      })
    );
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService, LiffService],
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
