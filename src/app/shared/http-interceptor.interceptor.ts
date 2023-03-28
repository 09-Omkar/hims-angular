import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { tap, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private api:ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.api.show();
    return next.handle(request).pipe(tap((event:HttpEvent<any>)=>{
      if(event instanceof HttpResponse){
        this.api.hide();
      }
    }, (error:any)=>{
      if(error.status == 0){
        this.api.setMessage({type:"error", message:"Server side problem", title:"Connection Problem"});
      }
    }));
  }
}
