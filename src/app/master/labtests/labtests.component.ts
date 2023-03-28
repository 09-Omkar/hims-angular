import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-labtests',
  templateUrl: './labtests.component.html',
  styleUrls: ['./labtests.component.css']
})
export class LabtestsComponent implements OnInit {

  formdata: any;
  result: any;
  id = 0;
  labid:any;
 

  constructor(private api: ApiService, private route : ActivatedRoute) { 
    this.labid = this.route.snapshot.params['labid']
    // console.log(this.labid);
  }


  ngOnInit(): void {
    this.load();
  
  }

  load() {
    this.id = 0;
    this.api.get("labtests/"+ this.labid).subscribe((result: any) => {

      this.result = result.data;   
         
    })

    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      testtype: new FormControl("Parameter", Validators.compose([Validators.required])),
      labid: new FormControl(""),
      rate: new FormControl("", Validators.compose([Validators.required]))

    })
  }

  cancel(){
    this.load();
  }

  edit(id: any) {
    this.id = id;
    this.api.get("labtests/"+ this.labid +"/" + id).subscribe((result: any) => {
      this.formdata = new FormGroup({
        name : new FormControl(result.data.name, Validators.compose([Validators.required])),
        testtype : new FormControl(result.data.testtype, Validators.compose([Validators.required])),
        labid: new FormControl(result.data.labid,),
        rate : new FormControl(result.data.rate, Validators.compose([Validators.required]))

      })
    })
  }

  delete(id: any) {
    swal.fire({
      title: 'Do you want to delete it ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Delete',

    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.api.delete("labtests/"+ this.labid +"/" + id).subscribe((result: any) => {
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

  submit(data: any) {
    if (this.id == 0) {
      swal.fire({
        icon: 'success',
        title: 'Your data has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.api.post("labtests/"+ this.labid , data).subscribe((result: any) => {
        this.load();

      })
    }
    else {
      this.api.put("labtests/"+this.labid + "/" + this.id, data).subscribe((result: any) => {
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



