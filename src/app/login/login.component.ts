import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formdata:any;
  message:any;

  constructor(private api:ApiService, private router:Router ){}

  ngOnInit(): void {
    if (localStorage.getItem("token")==null)
      localStorage.setItem("token", "mytoken");

    // this.api.post("gettoken", null).subscribe((result:any)=>{

    //   localStorage.setItem("token", result.token);
      
    // });

    this.formdata = new FormGroup({
      username:new FormControl("",Validators.compose([Validators.required])),
      password:new FormControl("",Validators.compose([Validators.required])),
    })
  }

  submit(data:any){
    this.api.post("authentication/login",data).subscribe((result:any)=>{
      if(result.status == "failed"){
        this.message = result.data;
      }
       if(result.status=="success"){
        // localStorage.setItem("token",result.token);
        localStorage.setItem("user", JSON.stringify(result.data));
        this.router.navigate(['/general/dashboard']);
       }      
    })
  }
}
