import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { appRoutingModule } from "./app.routing";
import { CoreModule } from "./core/core.module";
import { PublicModule } from "./public/public.module";
import { ProtectedModule } from "./protected/protected.module";
import { authInterceptorProviders } from "./core/_helpers/auth.interceptor";
/* import { NotifierModule, NotifierOptions } from "angular-notifier"; */
/**
 * Custom angular notifier options
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    CoreModule,
    PublicModule,
    ProtectedModule,
    appRoutingModule,
    RouterModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
