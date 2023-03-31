import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-doctorcatrgorywiseopdservicerates',
  templateUrl: './doctorcatrgorywiseopdservicerates.component.html',
  styleUrls: ['./doctorcatrgorywiseopdservicerates.component.css']
})
export class DoctorcatrgorywiseopdserviceratesComponent implements OnInit{
  result:any;
  doctors:any;
  categories:any;
  doctorid = 0;
  categoryid = 0;


  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.get("categories").subscribe((result:any)=>{
      this.categories = result.data;
    });
    this.api.get("categories").subscribe((result:any)=>{
      this.doctors = result.data;
    });
  }
  load(){
    if(this.doctorid == 0 || this.categoryid == 0){
      this.result = [];
    }
    else{
      this.api.get("opdservices/getrates/" + this.doctorid + "/" + this.categoryid + "/0").subscribe((result:any)=>{
        this.result = result.data;
      })
    }
  }

  copy(from:string, to:string){
    this.result = this.result.map((record:any, i:number)=>{
      record[to] = record[from];
      return record;
    })
  }

  changeValue(event:Event, valueof:string, index:number){
    this.result[index][valueof] = (<HTMLInputElement>event.target).value;
  }

  submit(){

  }

  cancel(){
    this.doctorid = 0;
    this.categoryid = 0;
    this.load();
  }
}
