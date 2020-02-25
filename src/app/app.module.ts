import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToastaModule} from 'ngx-toasta';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateTimePickerModule} from 'ngx-datetime-picker';
// firebase
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastaModule.forRoot(),
    DateTimePickerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
