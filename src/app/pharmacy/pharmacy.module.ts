import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { LandingComponent } from './landing.component';
import { ItemsComponent } from './items/items.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LandingComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
    PharmacyRoutingModule,
    SharedModule
  ]
})
export class PharmacyModule { }
