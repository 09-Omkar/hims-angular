import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-modulemenus',
  templateUrl: './modulemenus.component.html',
  styleUrls: ['./modulemenus.component.css']
})
export class ModulemenusComponent {
  parentMenus: any;
  result: any;
  modules: any;
  moduleid = 0;


  constructor(private api: ApiService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.api.get("modules/").subscribe((result: any) => {
      this.modules = result.data;
      this.load();
    });
  }

  load() {
    if (this.moduleid != 0) {
      this.api.get("modules/modulemenus/" + this.moduleid).subscribe((result: any) => {
        this.parentMenus = result.data;
        
      })
    }
    else {
      this.parentMenus = [];
    }
  }

  addRemoveMenu(event: Event, id: number) {
    if((<HTMLInputElement> event.target).checked){
      this.api.post("modules/addmodulemenu/" + this.moduleid + "/" + id, null).subscribe((result: any) => {
        console.log(result);
      })
    }
    else{
      this.api.post("modules/removemodulemenu/" + this.moduleid + "/" + id, null).subscribe((result: any) => {
        console.log(result);
      })
    }
  }
}
