import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class modulesComponent implements OnInit{
  formdata: any;
  results: any;
  id = 0;

  constructor(public api: ApiService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = 0;
    this.api.get("modules/").subscribe((result: any) => {
      this.results = result.data;
      // console.log(result);
    })
    this.formdata = new FormGroup({
        srno:new FormControl("",Validators.compose([Validators.required])),
        name:new FormControl("",Validators.compose([Validators.required])),
        image:new FormControl(""),
        link:new FormControl("",Validators.compose([Validators.required])),
    })
  };

  edit(id: any) {
    this.id = id;
    this.api.get("modules/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        srno: result.data.srno,
        name: result.data.name,
        link: result.data.link
      });
      // this.formdata = new FormGroup({
      //   srno:new FormControl(result.data.srno,Validators.compose([Validators.required])),
      //   name:new FormControl(result.data.name,Validators.compose([Validators.required])),
      //   image:new FormControl(""),
      //   link:new FormControl(result.data.link,Validators.compose([Validators.required])),
      // })
    })
  };

  delete(id: any) {
    swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("modules/" + id).subscribe((result: any) => {
          this.load()
        })
        this.toastr.success('Deleted Sccessfully','Module')       
      }
      else{
        this.toastr.error('Something went wrong','Not Deleted')
      }

    })


  }

  submit(data: any) {
    // console.log(data);
    if (this.id == 0) {
      if(data.image == ""){
        alert("Please select image");
        return;
      }
      this.api.post("modules", data).subscribe((result: any) => {
        this.load();
        (<HTMLInputElement>document.getElementById("image")).value = "";
        this.toastr.success('Saved Successfully','Gender');
        // swal.fire({
        //   icon: 'success',
        //   title: 'Your data has been saved',
        //   showConfirmButton: false,
        //   timer: 1500
        // })

      })
    }
    else if(this.id!=0){
      this.api.put("modules/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.toastr.success('Updated Successfully','Gender');
        // swal.fire({
        //   icon: 'success',
        //   title: 'Data updated!',
        //   showConfirmButton: false,
        //   timer: 1500
        // })

      })
    }
    else{
      this.toastr.error('Something went wrong','Not Deleted')
    }
  }
  
  imageChanged(event:any){
   
    // console.log(imagectrl);

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      if(reader.result != null){
        this.formdata.patchValue({
          image: reader.result.toString().substring(reader.result.toString().indexOf(",") + 1)
        });
      }
    }
  }



 

}
