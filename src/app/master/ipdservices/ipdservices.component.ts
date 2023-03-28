import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ipdservices',
  templateUrl: './ipdservices.component.html',
  styleUrls: ['./ipdservices.component.css']
})
export class IpdservicesComponent {
   formdata:any;
  result:any;
  id = 0;

  constructor(private api:ApiService){}


  ngOnInit(): void {


   this.load();


  }

  load(){
    this.id = 0;
    this.api.get("ipdservices").subscribe((result:any)=>{
      this.result = result.data;
      console.log(result);

    })
    this.formdata= new FormGroup({
      srno:new FormControl("",Validators.compose([Validators.required])),
      name:new FormControl("",Validators.compose([Validators.required])),
      rate:new FormControl("",Validators.compose([Validators.required])),
      toselectdoctor:new FormControl(false),
      changesasperroom:new FormControl(false),
      isitroom:new FormControl(false),



    })
  }

  edit(id:any){

    console.log(id);

    this.id = id;
    this.api.get("ipdservices/" + id).subscribe((result:any)=>{
      console.log(result);

      this.formdata= new FormGroup({
        srno:new FormControl(result.data.srno,Validators.compose([Validators.required])),
        name:new FormControl(result.data.name,Validators.compose([Validators.required])),
        rate:new FormControl(result.data.rate,Validators.compose([Validators.required])),
        toselectdoctor:new FormControl(false),
        changesasperroom:new FormControl(false),
        isitroom:new FormControl(false),
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
        this.api.delete("ipdservices/" + id).subscribe((result:any)=>{
          this.load()
        })
        swal.fire(
          'Deleted!',

        )
      }
    })


  }
  cancle(){

    this.load
  }



  submit(data:any){
    console.log(data);

    if(this.id==0){
    this.api.post("ipdservices/", data).subscribe((result:any)=>{
      console.log(result);
      
      if(result.status == 'success'){
        this.load();
        swal.fire({
          icon: 'success',
          title: 'Your data has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }


    })
    }
    else{
      this.api.put("ipdservices/" + this.id, data).subscribe((result:any)=>{
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
