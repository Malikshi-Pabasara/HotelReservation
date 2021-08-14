import { HttpClient } from "@angular/common/http";  //call API
import { Injectable } from "@angular/core";  //service
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Roomtype } from "./roomtype";
import { environment } from "src/environments/environment";

@Injectable({  //identify service
    providedIn: 'root',
})

export class RoomtypeService{
    
    contactsBaseUrl: string = environment.serverBaseUrl  + '/roomTypes';
    constructor(private http : HttpClient, private router: Router, public fb: FormBuilder){
    }

    getAllRoomType(){
      return this.http.get<Roomtype[]>(this.contactsBaseUrl);
    } 
    deleteRoomType(id: string) {
      return this.http.delete(this.contactsBaseUrl + '/' + id);
    }
    submitForm(formData: any) {
      return this.http.post(this.contactsBaseUrl , formData);
    }

    UpdateRoomtype(id:string, formData: any){
      return this.http.put (this.contactsBaseUrl + '/' + id, formData);
    }
}
