import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

const routes: Routes = [
  {path:'', component:LoginComponent, pathMatch:'full'},
  {path:'demo',component:SidebarComponent},
  {path:'general', loadChildren:()=>import('./general/general.module').then(m=>m.GeneralModule)},
  {path:'master', loadChildren:()=>import('./master/master.module').then(m=>m.MasterModule)},
  {path:'pharmacy', loadChildren:()=>import('./pharmacy/pharmacy.module').then(m=>m.PharmacyModule)},
  {path:'igap', loadChildren:()=>import('./igap/igap.module').then(m=>m.IgapModule)},
  {path:'system', loadChildren:()=>import('./system/system.module').then(m=>m.SystemModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
