import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { AddSongComponent } from './add-song/add-song/add-song.component';
import { ModifyDeleteSongComponent } from './modify-delete/modify-delete-song/modify-delete-song.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'home', component: ModifyDeleteSongComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddSongComponent, canActivate: [AuthGuard] },
  { path: 'update-form/:id', component: UpdateFormComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
