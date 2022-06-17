import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PresentationListComponent} from "./presentation-list/presentation-list.component";

const routes: Routes = [
  { path:'', redirectTo:'presentations',pathMatch:'full' },
  { path: 'presentations', component:PresentationListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
