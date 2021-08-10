import { HttpClient } from "@angular/common/http";  //call API
import { Injectable } from "@angular/core";  //service
import { Guest } from "./guest";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";

@Injectable({  //identify service
    providedIn: 'root',
})

export class GuestService{
    
    contactsBaseUrl: string = environment.serverBaseUrl + '/contacts';
    constructor(private http : HttpClient, private router: Router, public fb: FormBuilder){
    }

    getAllContacts(){
      return this.http.get<Guest[]>(this.contactsBaseUrl);
    } 

    deleteGuest(id: string) {
      return this.http.delete(this.contactsBaseUrl + '/' + id);
    }

    submitForm(formData: any) {
      return this.http.post(this.contactsBaseUrl, formData);
    }

    UpdateGuest(id:string, formData: any){
      return this.http.put (this.contactsBaseUrl + '/' + id, formData);
    }
}