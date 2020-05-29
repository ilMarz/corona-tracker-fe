import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';


const routes: Routes = [

  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
