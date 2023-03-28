import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {
  formdata:any;
  result:any;
  id = 0;

  constructor(private api:ApiService){}


  ngOnInit(): void {


   this.load();


  }

  load(){
    this.id = 0;
    this.api.get("departments").subscribe((result:any)=>{
      this.result = result.data;
    })
    this.formdata= new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required]))
    })
  }

  edit(id:any){
    this.id = id;
    this.api.get("departments/" +id).subscribe((result:any)=>{
      this.formdata= new FormGroup({
        name:new FormControl(result.data.name,Validators.compose([Validators.required]))
      })
    })
  }

  delete(id:any){
    swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("departments/" + id).subscribe((result:any)=>{
          this.load()
        })
        swal.fire(
          'Deleted!',

        )
      }
    })


  }
  cancle(){
    this.load();
  }

  submit(data:any){

    if(this.id==0){
    this.api.post("departments/", data).subscribe((result:any)=>{
      console.log(result);

      if(result.status = "success"){
        swal.fire({
          icon: 'success',
          title: 'Your data has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else(result.failed)



    })
    }
    else{
      this.api.put("departments/" + this.id, data).subscribe((result:any)=>{
        this.load();
        swal.fire({
          icon: 'success',
          title: 'Data updated!',
          showConfirmButton: false,
          timer: 1500
        })

      })
    }
  }

}
