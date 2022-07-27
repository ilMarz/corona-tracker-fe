import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ErrorComponent } from './component/error/error.component';


const routes: Routes = [

  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'error', component: ErrorComponent, data: {title: 'Error'}},
  {path: 'error', redirectTo: '/error', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
