import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit{
  formdata: any;
  result: any;
  parentMenus:any;
  id = 0;
  p:number=0;
  itemsPerPage:number=30;

  constructor(private api: ApiService, private toastr:ToastrService) { }


  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = 0;
    this.api.get("menus/").subscribe((result: any) => {
      this.result = result.data;
      console.log(this.result);
      this.parentMenus = this.result.filter((menu:any, i:number)=>{
        if(menu.child === "True"){
          return menu;
        }
      })
    })
    this.formdata = new FormGroup({
      title:new FormControl("",Validators.compose([Validators.required])),
      canhavechilds:new FormControl(false),
      menuid:new FormControl(0,Validators.compose([Validators.required])),
      srno:new FormControl("",Validators.compose([Validators.required])),
      icon:new FormControl("",Validators.compose([Validators.required])),
      link:new FormControl("",Validators.compose([Validators.required])),
    })
  };

  edit(id: any) {
    this.id = id;
    this.api.get("menus/" + id).subscribe((result: any) => {
      this.formdata = new FormGroup({
        title:new FormControl(result.data.title,Validators.compose([Validators.required])),
        canhavechilds:new FormControl(result.data.canhavechilds == 1 ? true : false),
        menuid:new FormControl(result.data.menuid),
        srno:new FormControl(result.data.srno,Validators.compose([Validators.required])),
        icon:new FormControl(result.data.icon),
        link:new FormControl(result.data.link),
      })
    })
  };

  reset(){
    this.id = 0;
    this.formdata = new FormGroup({
      title:new FormControl("",Validators.compose([Validators.required])),
      canhavechilds:new FormControl(false),
      menuid:new FormControl(0,Validators.compose([Validators.required])),
      srno:new FormControl("",Validators.compose([Validators.required])),
      icon:new FormControl("",Validators.compose([Validators.required])),
      link:new FormControl("",Validators.compose([Validators.required])),
    })
  }

  delete(id: any) {
    swal.fire({
      position:'center',
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("menus/" + id).subscribe((result: any) => {
          this.load()
        })
        this.toastr.success('Deleted Sccessfully','Menu')
      }
      else{
        this.toastr.error('Something went wrong','Not Deleted')
      }
    })


  };

  submit(data: any) {
    console.log(data);
    
    if (this.id == 0) {
      this.api.post("menus", data).subscribe((result: any) => {
        this.load();
        this.toastr.success('Saved Sccessfully','Menu')
        // swal.fire({
        //   icon: 'success',
        //   title: 'Your data has been saved',
        //   showConfirmButton: false,
        //   timer: 1500
        // })

      })
    }
    else if(this.id!=0){
      this.api.put("menus/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.toastr.success('Updated Successfully','Menu')
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
    };
  }

}
