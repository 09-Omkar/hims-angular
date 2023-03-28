import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  modules: any;
  user: any;

  constructor(public api: ApiService, private router: Router) {

    this.user = localStorage.getItem("user");
    if (this.user != null) {
      this.user = JSON.parse(this.user);
      this.api.get("usertypes/usertypemodules/" + this.user.usertypeid).subscribe((result: any) => {
        this.modules = result.data;
        this.modules = this.modules.filter((module:any, i:number)=>{
            if(module.tochecked == 1)
              return module;
        })
        console.log(this.modules);
      });
    }
    else{
      this.router.navigate(["/"]);
    }
  }

  moduleClicked(module:any){
    localStorage.setItem("moduleid", module.id);
    this.router.navigate([module.link]);
  }
}
