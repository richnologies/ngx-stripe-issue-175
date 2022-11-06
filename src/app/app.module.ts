import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgxStripeModule } from 'ngx-stripe';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_nDR7IWEIGLp4a1SBtqKH5eyg')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
