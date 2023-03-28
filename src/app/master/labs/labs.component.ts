import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent implements OnInit{

  formdata:any;
  result:any;
  id = 0;
  p: number = 1;
  itemsPerPage :number = 3;

  constructor(private api:ApiService){
    
  }


  ngOnInit(): void {


   this.load();

    
  }

  load(){
    this.id = 0;
    this.api.get("labs").subscribe((result:any)=>{
      this.result = result.data;
    })
    this.formdata= new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required]))
    })
  }

  cancel(){
    this.load();
  }

  edit(id:any){
    this.id = id;
    this.api.get("labs/" +id).subscribe((result:any)=>{
      this.formdata= new FormGroup({
        name:new FormControl(result.data.name,Validators.compose([Validators.required]))
      })
    })

    this.api.get("labtests/").subscribe((result: any) => {

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
        this.api.delete("labs/" + id).subscribe((result:any)=>{
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
    this.api.post("labs", data).subscribe((result:any)=>{
      console.log(result);

      if(result.status == "success"){
        this.load();
        swal.fire({
          icon: 'success',
          title: 'Your data has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
        swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timer: 1500
        })
      }
       
      
    })
    }
    else{
      this.api.put("labs/" + this.id, data).subscribe((result:any)=>{
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
