import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { GendersComponent } from './genders/genders.component';
import { LandingComponent } from './landing.component';
import { SharedModule } from '../shared/shared.module';
import { StatesComponent } from './states/states.component';
import { TalukasComponent } from './talukas/talukas.component';
import { DistrictsComponent } from './districts/districts.component';
import { TitlesComponent } from './titles/titles.component';
import { PaymentmodesComponent } from './paymentmodes/paymentmodes.component';
import { MenufilterPipe } from '../shared/menufilter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { BedsComponent } from './beds/beds.component';
import { BloodgroupsComponent } from './bloodgroups/bloodgroups.component';
import { CategoriesComponent } from './categories/categories.component';
import { ConcessionauthoritiesComponent } from './concessionauthorities/concessionauthorities.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { DepartmentsComponent } from './departments/departments.component';
import { IpdoptionsComponent } from './ipdoptions/ipdoptions.component';
import { IpdservicesComponent } from './ipdservices/ipdservices.component';
import { LabsComponent } from './labs/labs.component';
import { LabtestsComponent } from './labtests/labtests.component';
import { LanguagesComponent } from './languages/languages.component';
import { NationalitiesComponent } from './nationalities/nationalities.component';
import { OpdservicesComponent } from './opdservices/opdservices.component';
import { RelationsComponent } from './relations/relations.component';
import { ReligionsComponent } from './religions/religions.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SpecializationsComponent } from './specializations/specializations.component';
import { VillagesComponent } from './villages/villages.component';

@NgModule({
  declarations: [
    LandingComponent,
    GendersComponent,
    StatesComponent,
    TalukasComponent,
    DistrictsComponent,
    TitlesComponent,
    PaymentmodesComponent,
    BedsComponent,
    BloodgroupsComponent,
    CategoriesComponent,
    ConcessionauthoritiesComponent,
    ConfigurationsComponent,
    DepartmentsComponent,
    IpdoptionsComponent,
    IpdservicesComponent,
    LabsComponent,
    LabtestsComponent,
    LanguagesComponent,
    NationalitiesComponent,
    OpdservicesComponent,
    RelationsComponent,
    ReligionsComponent,
    RoomsComponent,
    SpecializationsComponent,
    VillagesComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    NgxPaginationModule

  ]
})
export class MasterModule { }
