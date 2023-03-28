import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { LandingComponent } from './landing.component';

const routes: Routes = [
  {path:'', component:LandingComponent, children:[
    {path:'items',component:ItemsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }
