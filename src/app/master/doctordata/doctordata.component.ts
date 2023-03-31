import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-doctordata',
  templateUrl: './doctordata.component.html',
  styleUrls: ['./doctordata.component.css']
})
export class DoctordataComponent implements OnInit{

  formdata:any;
  result:any;
  id = 0;
  p: number = 1;
  itemsPerPage:number = 10;

  constructor(private api:ApiService, private router:Router){}


  ngOnInit(): void {


   this.load();


  }

  load(){
    this.id = 0;
    this.api.get("doctors").subscribe((result:any)=>{
      this.result = result.data;
    })
  }
  edit(id:any){
    this.router.navigate(["doctors"])
    this.id = id;
    this.api.get("doctors/" +id).subscribe((result:any)=>{
      this.formdata= new FormGroup({
        titleid:new FormControl(result.data.titleid,Validators.compose([Validators.required])),
        fname:new FormControl("",Validators.compose([Validators.required])),
        mname:new FormControl("",Validators.compose([Validators.required])),
        lname:new FormControl("",Validators.compose([Validators.required])),
        qualification:new FormControl("",Validators.compose([Validators.required])),
        regno:new FormControl("",Validators.compose([Validators.required])),
        panno:new FormControl("",Validators.compose([Validators.required])),
        birthdate:new FormControl("",Validators.compose([Validators.required])),
        doctortype:new FormControl("",Validators.compose([Validators.required])),
        departmentid:new FormControl("",Validators.compose([Validators.required])),
        specializationid:new FormControl("",Validators.compose([Validators.required])),
        casepaperdays:new FormControl("",Validators.compose([Validators.required])),
        bankaccountno:new FormControl("",Validators.compose([Validators.required])),
        ifsccode:new FormControl("",Validators.compose([Validators.required])),
        mobileno:new FormControl("",Validators.compose([Validators.required])),
        email:new FormControl("",Validators.compose([Validators.required])),
        address:new FormControl("",Validators.compose([Validators.required])),
        isactive:new FormControl("",Validators.compose([Validators.required])),
      })

    })
  }

  delete(id:any){
    swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      position: 'bottom-left',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("doctors/" + id).subscribe((result:any)=>{
          this.load()
        })
        swal.fire(
          'Deleted!',


        )
      }
    })
  }
}
