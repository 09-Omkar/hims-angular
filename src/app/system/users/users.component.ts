import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  formdata:any;
  doctors:any;
  usertypes:any;
  labs:any;
  result:any;
  id = 0;

  constructor(private api:ApiService){}


  ngOnInit(): void {
    this.api.get("doctors").subscribe((result:any)=>{
      this.doctors = result.data;
    });
    this.api.get("usertypes").subscribe((result:any)=>{
      this.usertypes = result.data;
    });
    this.api.get("labs").subscribe((result:any)=>{
      this.labs = result.data;
    });
   this.load();
  }
  cancel(){
   this.load();
  }

  load(){
    this.id = 0;
    this.api.get("users").subscribe((result:any)=>{
      this.result = result.data;
    });

    this.formdata= new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required])),
      username:new FormControl("",Validators.compose([Validators.required])),
      password:new FormControl("",Validators.compose([Validators.required])),
      mobileno:new FormControl(""),
      email:new FormControl(""),
      doctorid:new FormControl(0,Validators.compose([Validators.required])),
      usertypeid:new FormControl(0,Validators.compose([Validators.required])),
      labid:new FormControl(0,Validators.compose([Validators.required])),
    })
  }

  edit(id:any){
    this.id = id;
    console.log(this.result)
    this.api.get("users/" +id).subscribe((result:any)=>{
      this.formdata.patchValue({
        name:result.data.name,
        username:result.data.username,
        password:result.data.password,
        mobileno:result.data.mobileno,
        email:result.data.email,
        doctorid:result.data.doctorid,
        usertypeid:result.data.usertypeid,
        labid:result.data.labid
      });
    });
  }

  delete(id:any){
    swal.fire({
      title: 'Do you want to delete it ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Delete',

    }).then((result: { isConfirmed: any; }) => {
          if (result.isConfirmed) {
            this.api.delete("users/" + id).subscribe((result:any)=>{
              this.load()
              swal.fire({
                icon: 'success',
                title: 'Data Deleted!',
                showConfirmButton: false,
                timer: 1500
              })
            });
            };
          })

  }

  submit(data:any){
    if(this.id==0){
      swal.fire({
        icon: 'success',
        title: 'Your data has been saved',
        showConfirmButton: false,
        timer: 500
      })
    this.api.post("users", data).subscribe((result:any)=>{
      this.load();

    })
    }
    else{
      this.api.put("users/" + this.id, data).subscribe((result:any)=>{
        this.load();
        swal.fire({
          icon: 'success',
          title: ' Data updated',
          showConfirmButton: false,
          timer: 500
        })

      })
    }
  }


}
