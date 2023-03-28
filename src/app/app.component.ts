import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader/public-api';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show = false;
  constructor(public api:ApiService){    
    this.api.showspinner.subscribe((result:any)=>{
      this.show = result;
    });
  }
 
}
