import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Message } from './Message';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  insert_success_msg = "Data Inserted Successfully.";
  delete_success_msg = "Data Deleted Successfully.";
  update_success_msg = "Data Updated Successfully.";
  
  baseurl="http://localhost:8081/";
  showspinner:BehaviorSubject<boolean>;

  constructor(private http:HttpClient , private toastr:ToastrService) { 
    this.showspinner = new BehaviorSubject(false);
  }

  show(){
    this.showspinner.next(true);
  }
  hide(){
    this.showspinner.next(false);
  }

  setMessage(message:Message){
    if(message.type == "success"){
      this.toastr.success(message.message, message.title);
    }
    else if(message.type == "error"){
      this.toastr.error(message.message, message.title);
    }
  }

  getHeader(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
   });
   return reqHeader;
  }

  get(api:string){
    return this.http.get(this.baseurl + api, { headers: this.getHeader() })
  };

  post(api:string, data:any){
    return this.http.post(this.baseurl + api, data ,{ headers: this.getHeader() })
  };

  put(api:string, data:any){
    return this.http.put(this.baseurl + api, data, { headers: this.getHeader() } )
  };

  delete(api:string){
    return this.http.delete(this.baseurl + api)
  };



  
}
