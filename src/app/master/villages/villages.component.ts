import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-villages',
  templateUrl: './villages.component.html',
  styleUrls: ['./villages.component.css']
})
export class VillagesComponent implements OnInit {

  formdata:any;
  result:any;
  id = 0;
  talukaid:any;


  constructor(private api:ApiService ,private route:ActivatedRoute ,private router:Router){
   
  }

  ngOnInit(): void {

    this.talukaid=this.route.snapshot.params["talukaid"];
    console.log(this.talukaid);
    
   this.load();

    
  }

  load(){
    this.id = 0;
    this.api.get("villages/"+this.talukaid).subscribe((res:any)=>{
      this.result = res.data;
    })
   
    this.formdata= new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required])),
      talukaid:new FormControl(this.talukaid,Validators.compose([Validators.required])),

    })
  }

  edit(id:any){    
    this.id = id;
    this.api.get("villages/" +this.talukaid+"/"+id).subscribe((result:any)=>{
      // console.log(result);
      
      this.formdata= new FormGroup({
        name:new FormControl(result.data.name,Validators.compose([Validators.required])),
        talukaid:new FormControl(this.talukaid,Validators.compose([Validators.required]))
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
        this.api.delete("villages/" + id).subscribe((result:any)=>{
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
    this.api.post("villages" ,data).subscribe((result:any)=>{  
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
      this.api.put("villages/"+this.id, data).subscribe((result:any)=>{
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
