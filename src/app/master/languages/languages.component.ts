import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  formdata: any;
  result: any;
  id = 0;

  constructor(private api: ApiService) { }


  ngOnInit(): void {


    this.load();


  }

  load() {
    this.id = 0;
    this.api.get("languages").subscribe((result: any) => {
      this.result = result.data;
    })
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required]))
    })
  }
  cancel() {
    this.load();
  }

  edit(id: any) {
    this.id = id;
    this.api.get("languages/" + id).subscribe((result: any) => {

      this.formdata = new FormGroup({
        name: new FormControl(result.data.name, Validators.compose([Validators.required]))
      })
    })
  }

  delete(id: any) {
    swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("languages/" + id).subscribe((result: any) => {
          this.load()
        })
        swal.fire(
          'Deleted!',

        )
      }
    })


  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post("languages", data).subscribe((result: any) => {
        if (result.status == "success") {
          this.load();
          swal.fire({
            icon: 'success',
            title: 'Your data has been saved',
            showConfirmButton: false,
            timer: 700
          })
        }
        else {
          swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            showConfirmButton: false,
            timer: 700
          })
        }

      })
    }
    else {
      this.api.put("languages/" + this.id, data).subscribe((result: any) => {
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

