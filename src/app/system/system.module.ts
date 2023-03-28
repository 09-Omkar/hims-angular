import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { LandingComponent } from './landing.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LandingComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
  ]
})
export class SystemModule { }
