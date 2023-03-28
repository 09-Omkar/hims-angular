import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menus: any;
  parentMenus:any;
  moduleid:any;

  constructor(private api: ApiService, private title:Title) { 

    this.moduleid = localStorage.getItem("moduleid");
    if(this.moduleid != null){
      this.moduleid = parseInt(this.moduleid);
    }
  }
  
  ngOnInit(): void {
    this.api.get("modules/modulemenus/" + this.moduleid).subscribe((result: any) => {
      this.parentMenus = result.data.filter((menu:any, i:number)=>{
            if(menu.tochecked == 1)
              return menu;
        });
    });

    this.api.get("menus/").subscribe((result: any) => {
      this.menus = result.data;
      console.log(this.menus);
    });
  }

  menuClicked(title:string){
    this.title.setTitle(title);
  }

}
