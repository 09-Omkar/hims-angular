import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';
import { ToastrService,}from 'ngx-toastr';

@Component({
  selector: 'app-nationalities',
  templateUrl: './nationalities.component.html',
  styleUrls: ['./nationalities.component.css']
})
export class NationalitiesComponent implements OnInit{

  formdata:any;
  result:any;
  id = 0;

  constructor(private api:ApiService){}


  ngOnInit(): void {


   this.load();


  }

  load(){
    this.id = 0;
    this.api.get("nationalities").subscribe((result:any)=>{
      this.result = result.data;
    })
    this.formdata= new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required]))
    })
  }

  edit(id:any){
    this.id = id;
    this.api.get("nationalities/" +id).subscribe((result:any)=>{
      // console.log(result);

      this.formdata= new FormGroup({
        name:new FormControl(result.data.name,Validators.compose([Validators.required]))
      })
      console.log(result);

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
        this.api.delete("nationalities/" + id).subscribe((result:any)=>{
          this.load()
        })
        // swal.fire(
        //   'Deleted!',

        // )

      }
    })


  }
  cancel(){
    this.load();
  }

  submit(data:any){
    if(this.id==0){
    this.api.post("nationalities", data).subscribe((result:any)=>{
      this.load();
      swal.fire({
        icon: 'success',
        title: 'Your data has been saved',
        showConfirmButton: false,
        position:'bottom-start',
        width:400,
        timer:1000
      })

    })
    }
    else{
      this.api.put("nationalities/" + this.id, data).subscribe((result:any)=>{
        this.load();
        swal.fire({
          icon: 'success',
          title: 'Data updated!',
          showConfirmButton: false,
          position:'bottom-start',
          width:400,
          timer: 1500
        })

      })
    }
  }

}


