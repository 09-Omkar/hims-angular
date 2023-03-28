import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ipdoptions',
  templateUrl: './ipdoptions.component.html',
  styleUrls: ['./ipdoptions.component.css']
})
export class IpdoptionsComponent {

  formdata:any;
  result:any;
  id = 0;
  p:number =1;
  itemsPerPage:number=5;

  constructor(private api:ApiService){}


  ngOnInit(): void {
   this.load();
  }

  load(){
    this.id = 0;
    this.api.get("ipdoptions").subscribe((result:any)=>{
   
      console.log(result);
      
      this.result = result.data;
    })
    this.formdata= new FormGroup({
      srno:new FormControl("",Validators.compose([Validators.required])),
      title:new FormControl("",Validators.compose([Validators.required])),
      link:new FormControl("",Validators.compose([Validators.required])),
      optionfor:new FormControl("",Validators.compose([Validators.required]))

    })
  }

  edit(id:any){
    this.id = id;
    this.api.get("ipdoptions/" +id).subscribe((result:any)=>{
      this.formdata= new FormGroup({
        srno:new FormControl(result.data.srno,Validators.compose([Validators.required])),
        title:new FormControl(result.data.title,Validators.compose([Validators.required])),
        link:new FormControl(result.data.link,Validators.compose([Validators.required])),
        optionfor:new FormControl(result.data.optionfor,Validators.compose([Validators.required])),
      })    
    })
  }

  delete(id:any){
    swal.fire({
      title: 'Do you want to delete it ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      
    }).then((result: { isConfirmed: any; }) => {
          if (result.isConfirmed) {
            this.api.delete("ipdoptions/" + id).subscribe((result:any)=>{
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
        timer: 1500
      })
    this.api.post("ipdoptions", data).subscribe((result:any)=>{
      this.load();
      
    })
    }
    else{
      this.api.put("ipdoptions/" + this.id, data).subscribe((result:any)=>{
        this.load();
        swal.fire({
          icon: 'success',
          title: ' Data updated',
          showConfirmButton: false,
          timer: 1500
        })
        
      })
    }
    
  }


}
