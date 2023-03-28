import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgapRoutingModule } from './igap-routing.module';
import { LandingComponent } from './landing.component';
import { ModulemenusComponent } from './modulemenus/modulemenus.component';
import { SharedModule } from '../shared/shared.module';
import { UsertypemodulesComponent } from './usertypemodules/usertypemodules.component';
import { UsertypesComponent } from './usertypes/usertypes.component';
import { modulesComponent } from './modules/modules.component';
import { MenusComponent } from './menus/menus.component';



@NgModule({
  declarations: [
    LandingComponent,
    UsertypesComponent,
    modulesComponent,
    MenusComponent,
    ModulemenusComponent,
    UsertypemodulesComponent
  ],
  
  imports: [
    CommonModule,
    IgapRoutingModule,
    SharedModule
  ]
})
export class IgapModule { }
