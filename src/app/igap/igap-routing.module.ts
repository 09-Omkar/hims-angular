import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { MenusComponent } from './menus/menus.component';
import { ModulemenusComponent } from './modulemenus/modulemenus.component';
import { modulesComponent } from './modules/modules.component';
import { UsertypemodulesComponent } from './usertypemodules/usertypemodules.component';
import { UsertypesComponent } from './usertypes/usertypes.component';

const routes: Routes = [
  {path:'',component:LandingComponent,children:[
    {path:'usertypes',component:UsertypesComponent},
    {path:'modules', component:modulesComponent},
    {path:'menus', component:MenusComponent},
    {path:'modulemenus',component:ModulemenusComponent},
    {path:'usertypemodules',component:UsertypemodulesComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IgapRoutingModule { }
