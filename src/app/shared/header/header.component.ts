import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  moduleid:any;
  menus:any;
  user:any;

  constructor(private api:ApiService, private router:Router){
    
  }
  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    if (this.user != null) {
      this.user = JSON.parse(this.user);
    }
    console.log(this.user.name);
  }


  
  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }

}
