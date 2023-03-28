import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usertypes',
  templateUrl: './usertypes.component.html',
  styleUrls: ['./usertypes.component.css']
})
export class UsertypesComponent {

  formdata:any;
  result:any;
  id = 0;

  constructor(private api:ApiService ,private toastr:ToastrService ){}


  ngOnInit(): void {


   this.load();


  }

  cancel(){
   this.load();

  }

  load(){
    this.id = 0;
    this.api.get("usertypes").subscribe((result:any)=>{
      this.result = result.data;
    })
    this.formdata= new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required]))
    })
  }

  edit(id:any){
    this.id = id;
    this.api.get("usertypes/" +id).subscribe((result:any)=>{
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
        this.api.delete("usertypes/" + id).subscribe((result:any)=>{
          this.load()
        })
        swal.fire(
          'Deleted!',

        )
      }
    })


  }

  submit(data:any){
    if(this.id==0){
    this.api.post("usertypes", data).subscribe((result:any)=>{
      this.load();
      this.toastr.success('Hello world!', 'Toastr fun!');
      // swal.fire({
      //   icon: 'success',
      //   title: 'Your data has been saved',
      //   showConfirmButton: false,
      //   timer: 1500
      // })

    })
    }
    else{
      this.api.put("usertypes/" + this.id, data).subscribe((result:any)=>{
        this.load();
      this.toastr.success('Hello world!', 'Toastr fun!');

        // swal.fire({
        //   icon: 'success',
        //   title: 'Data updated!',
        //   showConfirmButton: false,
        //   timer: 1500
        // })

      })
    }
  }

}

