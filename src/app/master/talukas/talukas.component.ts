import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-talukas',
  templateUrl: './talukas.component.html',
  styleUrls: ['./talukas.component.css']
})
export class TalukasComponent implements OnInit {

  formdata:any;
  result:any;
  id = 0;
  districtid:any;


  constructor(private api:ApiService ,private route:ActivatedRoute ,private router:Router){
   
  }

  ngOnInit(): void {

    this.districtid=this.route.snapshot.params["districtid"];
    console.log(this.districtid);
    
   this.load();

    
  }

  load(){
    this.id = 0;
    this.api.get("talukas/"+this.districtid).subscribe((res:any)=>{
      this.result = res.data;
    })
   
    this.formdata= new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required])),
      districtid:new FormControl(this.districtid,Validators.compose([Validators.required])),

    })
  }

  edit(id:any){    
    this.id = id;
    this.api.get("talukas/" +this.districtid+"/"+id).subscribe((result:any)=>{
      // console.log(result);
      
      this.formdata= new FormGroup({
        name:new FormControl(result.data.name,Validators.compose([Validators.required])),
        districtid:new FormControl(this.districtid,Validators.compose([Validators.required]))
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
        this.api.delete("talukas/" + id).subscribe((result:any)=>{
          this.load()
        })
        swal.fire(
          'Deleted!',
         
        )
      }
    })
      
    
  }

  submit(data:any){

// console.log(data);

    if(this.id==0){
    this.api.post("talukas" ,data).subscribe((result:any)=>{  
      // console.log(result);
      
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
      this.api.put("talukas/"+this.id, data).subscribe((result:any)=>{
        // console.log(result);
        
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
