import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-concessionauthorities',
  templateUrl: './concessionauthorities.component.html',
  styleUrls: ['./concessionauthorities.component.css']
})
export class ConcessionauthoritiesComponent implements OnInit{

  formdata:any;
  result:any;
  id = 0;

  constructor(private api:ApiService){}


  ngOnInit(): void {


   this.load();


  }

  load(){
    this.id = 0;
    this.api.get("concessionauthorities").subscribe((result:any)=>{
      this.result = result.data;
    })
    this.formdata= new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required]))
    })
  }

  edit(id:any){
    this.id = id;
    this.api.get("concessionauthorities/" +id).subscribe((result:any)=>{
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
        this.api.delete("concessionauthorities/" + id).subscribe((result:any)=>{
          this.load()
        })
        swal.fire(
          'Deleted!',

        )
      }
    })
  }

  cancel(){
    this.load();
  }

  submit(data:any){
    if(this.id==0){
    this.api.post("concessionauthorities", data).subscribe((result:any)=>{
      this.load();
      swal.fire({
        icon: 'success',
        title: 'Your data has been saved',
        showConfirmButton: false,
        timer: 1500
      })

    })
    }
    else{
      this.api.put("concessionauthorities/" + this.id, data).subscribe((result:any)=>{
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
