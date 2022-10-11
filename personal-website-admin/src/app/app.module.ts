import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSongComponent } from './add-song/add-song/add-song.component';
import { ThumbnailInfoComponent } from './components/thumbnail-info/thumbnail-info.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { ModifyDeleteSongComponent } from './modify-delete/modify-delete-song/modify-delete-song.component';
import { NavComponent } from './components/nav/nav.component';

import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddSongComponent,
    ThumbnailInfoComponent,
    AdminLoginComponent,
    UpdateFormComponent,
    ModifyDeleteSongComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    { 
      provide:  HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
