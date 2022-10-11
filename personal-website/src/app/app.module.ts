import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { CurrentSongComponent } from './queue/current-song/current-song.component';
import { HomeComponent } from './queue/home/home.component';
import { SearchComponent } from './queue/search/search.component';
import { ButtonComponent } from './components/button/button.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './queue/register/register.component';
import { BetaTesterComponent } from './components/beta-tester/beta-tester.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PlaylistComponent } from './queue/playlist/playlist.component';

import { AuthGuard } from './guard/auth.guard';
import { LyricsComponent } from './experimental/lyrics/lyrics.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'current-song', component: CurrentSongComponent },
  { path: 'search', component: SearchComponent },
  { path: 'register/:id', component: RegisterComponent },
  { path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuard] },
  { path: 'current-song/lyrics', component: LyricsComponent, canActivate: [AuthGuard] },
]
@NgModule({
  declarations: [
    AppComponent,
    CurrentSongComponent,
    HomeComponent,
    SearchComponent,
    ButtonComponent,
    LoginComponent,
    RegisterComponent,
    BetaTesterComponent,
    CustomerComponent,
    PlaylistComponent,
    LyricsComponent,
  ],
  entryComponents: [LoginComponent],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    FontAwesomeModule
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
