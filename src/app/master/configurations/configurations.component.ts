import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit{

  formdata:any;
  result:any;
  id = 0;

  constructor(private api:ApiService){}


  ngOnInit(): void {


   this.load();


  }

  load(){
    this.id = 0;
    this.api.get("configurations").subscribe((result:any)=>{
      this.result = result.data;
    })
    this.formdata= new FormGroup({
      cname:new FormControl("",Validators.compose([Validators.required])),
      cvalue:new FormControl("",Validators.compose([Validators.required]))
    })
  }

  cancel(){
    this.load();
  }

  edit(id:any){
    this.id = id;
    this.api.get("configurations/" +id).subscribe((result:any)=>{
      this.formdata= new FormGroup({
        cname:new FormControl(result.data.cname,Validators.compose([Validators.required])),
        cvalue:new FormControl(result.data.cvalue,Validators.compose([Validators.required]))
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
        this.api.delete("configurations/" + id).subscribe((result:any)=>{
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
    this.api.post("configurations", data).subscribe((result:any)=>{
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
      this.api.put("configurations/" + this.id, data).subscribe((result:any)=>{
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
