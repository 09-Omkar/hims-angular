import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-genders',
  templateUrl: './genders.component.html',
  styleUrls: ['./genders.component.css']
})
export class GendersComponent implements OnInit {

  formdata: any;
  result: any;
  id = 0;

  constructor(private api: ApiService, private toastr: ToastrService) { }


  ngOnInit(): void {


    this.load();


  }

  load() {
    this.id = 0;
    this.api.get("genders").subscribe((result: any) => {
      this.result = result.data;
    })
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required]))
    })
  }

  edit(id: any) {
    this.id = id;
    this.api.get("genders/" + id).subscribe((result: any) => {
      this.formdata = new FormGroup({
        name: new FormControl(result.data.name, Validators.compose([Validators.required]))
      })
    })
  }

  delete(id: any) {
    swal.fire({
      position: 'center',
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("genders/" + id).subscribe((result: any) => {
          this.load()
        });
        this.toastr.success('Deleted Sccessfully', 'Gender')
      }
      else {
        this.toastr.error('Something went wrong', 'Not Deleted')
      }
    })


  }



  submit(data: any) {
    if (this.id == 0) {
      this.api.post("genders", data).subscribe((result: any) => {
        if (result.status == "success") {
          this.load();
          this.api.setMessage({ type: "success", title: "Success", message: this.api.insert_success_msg })
        }
        else {
          this.api.setMessage({ type: "error", title: "Error", message: result.data.sqlMessage });
          // console.log(result);
        }
      })
    }
    else {
      this.api.put("genders/" + this.id, data).subscribe((result: any) => {
        if (result.status == "success") {
          this.load();
          this.api.setMessage({ type: "success", title: "Success", message: this.api.update_success_msg })
        }
        else {
          this.api.setMessage({ type: "error", title: "Error", message: result.data.sqlMessage });
          // console.log(result);
        }
      })
    }
  }
}
