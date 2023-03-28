import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { HttpInterceptorInterceptor } from './http-interceptor.interceptor';
import { MenufilterPipe } from './menufilter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MenufilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MenufilterPipe,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers:[ApiService, {
    provide:HTTP_INTERCEPTORS,
    useClass:HttpInterceptorInterceptor,
    multi:true
  }]
})
export class SharedModule { }
