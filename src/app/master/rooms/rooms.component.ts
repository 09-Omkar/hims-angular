import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  formdata: any;
  result: any;
  id = 0;

  constructor(private api: ApiService) { }


  ngOnInit(): void {


    this.load();


  }

  load() {
    this.id = 0;
    this.api.get("rooms").subscribe((result: any) => {
      console.log(result);
      
      this.result = result.data;
    })
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      shortname: new FormControl("", Validators.compose([Validators.required])),
      ocolor: new FormControl("", Validators.compose([Validators.required])),
      vcolor: new FormControl("", Validators.compose([Validators.required]))
    })
  }
  cancel() {
    this.load();
  }

  edit(id: any) {
    this.id = id;
    this.api.get("rooms/" + id).subscribe((result: any) => {
      this.formdata = new FormGroup({
        name: new FormControl(result.data.name, Validators.compose([Validators.required])),
        shortname: new FormControl(result.data.shortname, Validators.compose([Validators.required])),
        ocolor: new FormControl(result.data.ocolor, Validators.compose([Validators.required])),
        vcolor: new FormControl(result.data.vcolor, Validators.compose([Validators.required]))
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
        this.api.delete("rooms/" + id).subscribe((result: any) => {
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
      this.api.post("rooms", data).subscribe((result: any) => {
        this.load();
        swal.fire({
          icon: 'success',
          title: 'Your data has been saved',
          showConfirmButton: false,
          timer: 1500
        })

      })
    }
    else {
      this.api.put("rooms/" + this.id, data).subscribe((result: any) => {
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


