import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit{

  formdata:any;
  result:any[]=[];
  id = 0;
  p: number = 1;
  itemsPerPage:number = 1;


  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {

   this.load();

  }

  load(){
    this.id = 0;
    this.api.get("doctors").subscribe((result:any)=>{
      // console.log(result.data);
      
      this.result = result.data;
    })
    this.formdata= new FormGroup({
      titleid:new FormControl("",Validators.compose([])),
      fname:new FormControl("",Validators.compose([Validators.required])),
      mname:new FormControl("",Validators.compose([Validators.required])),
      lname:new FormControl("",Validators.compose([Validators.required])),
      qualification:new FormControl("",Validators.compose([])),
      regno:new FormControl("",Validators.compose([])),
      panno:new FormControl("",Validators.compose([])),
      birthdate:new FormControl("",Validators.compose([])),
      doctortype:new FormControl("",Validators.compose([])),
      departmentid:new FormControl("",Validators.compose([])),
      specializationid:new FormControl("",Validators.compose([])),
      casepaperdays:new FormControl("",Validators.compose([])),
      bankaccountno:new FormControl("",Validators.compose([])),
      ifsccode:new FormControl("",Validators.compose([])),
      mobileno:new FormControl("",Validators.compose([])),
      email:new FormControl("",Validators.compose([])),
      address:new FormControl("",Validators.compose([])),
      isactive:new FormControl(false,Validators.compose([])),

    })
  }
  cancel(){
    this.load();
  }
  submit(data:any){
    console.log(data);
    
    if(this.id==0){
    this.api.post("doctors", data).subscribe((result:any)=>{
      console.log(result);
      
      

      this.load();
      swal.fire({
        icon: 'success',
        title: 'Your data has been saved',
        showConfirmButton: false,
        position: 'bottom-left',
        timer: 1000
      })
    this.router.navigate(["doctordata"])
    })

    }
    else{
      this.api.put("doctors/" + this.id, data).subscribe((result:any)=>{
        this.load();
        swal.fire({
          icon: 'success',
          title: 'Data updated!',
          showConfirmButton: false,
          position: 'bottom-left',
          timer: 1000
        })

      })
    }
  }

}

