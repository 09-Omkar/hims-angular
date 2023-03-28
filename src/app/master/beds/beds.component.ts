import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-beds',
  templateUrl: './beds.component.html',
  styleUrls: ['./beds.component.css']
})
export class BedsComponent implements OnInit {

  formdata: any;
  result: any;
  id = 0;
  roomid: any;
  room: any;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.roomid = this.activatedRoute.snapshot.paramMap.get("roomid") || 0;
    this.api.get("rooms/" + this.roomid).subscribe((result: any) => {
      this.room = result.data;
    })
    this.load();


  }

  load() {
    this.id = 0;
    this.api.get("beds/" + this.roomid).subscribe((result: any) => {
      this.result = result.data;
    })
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      roomid: new FormControl(this.roomid, Validators.compose([Validators.required]))
    })
  }
  cancel() {
    this.load();
  }

  edit(id: any) {
    this.id = id;
    console.log("beds/" + this.roomid + "/" + id);
    this.api.get("beds/" + this.roomid + "/" + id).subscribe((result: any) => {
      this.formdata = new FormGroup({
        name: new FormControl(result.data.name, Validators.compose([Validators.required])),
        roomid: new FormControl(this.roomid, Validators.compose([Validators.required]))
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
        this.api.delete("beds/" + this.roomid + "/"+ id).subscribe((result: any) => {
          console.log(result );

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
      this.api.post("beds", data).subscribe((result: any) => {
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
      this.api.put("beds/" + this.id, data).subscribe((result: any) => {
        if (result.status == "success") {
          this.load();
          swal.fire({
            icon: 'success',
            title: 'Data updated!',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          swal.fire({
            icon: 'error',
            title: 'something went wrong',
            showConfirmButton: false,
            timer: 1500
          })
        }

      })
    }
  }

}
