import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-usertypemodules',
  templateUrl: './usertypemodules.component.html',
  styleUrls: ['./usertypemodules.component.css']
})
export class UsertypemodulesComponent {
  modules: any;
  usertypes: any;
  usertypeid = 0;


  constructor(private api: ApiService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.api.get("usertypes/").subscribe((result: any) => {
      this.usertypes = result.data;
      this.load();
    });
  }

  load() {
    if (this.usertypeid != 0) {
      this.api.get("usertypes/usertypemodules/" + this.usertypeid).subscribe((result: any) => {
        this.modules = result.data;        
      })
    }
    else {
      this.modules = [];
    }
  }

  addRemove(event: Event, id: number) {
    if((<HTMLInputElement> event.target).checked){
      this.api.post("usertypes/addusertypemodule/" + this.usertypeid + "/" + id, null).subscribe((result: any) => {
        console.log(result);
      })
    }
    else{
      this.api.post("usertypes/removeusertypemodule/" + this.usertypeid + "/" + id, null).subscribe((result: any) => {
        console.log(result);
      })
    }
  }
}
