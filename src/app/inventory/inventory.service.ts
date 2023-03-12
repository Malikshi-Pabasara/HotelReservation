import { HttpClient } from "@angular/common/http";  //call API
import { Injectable } from "@angular/core";  //service
import { Router } from "@angular/router";
import { inventory } from "./inventory";
import { FormBuilder, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";

@Injectable({  //identify service
    providedIn: 'root',
})

export class InventoryService {
    
    contactsBaseUrl: string = environment.serverBaseUrl + '/inventories';
    constructor(private http : HttpClient, private router: Router, public fb: FormBuilder) {
    }

    getAllContacts() {
      return this.http.get<inventory[]>(this.contactsBaseUrl);
    } 

    deleteGuest(id: string) {
      return this.http.delete(this.contactsBaseUrl + '/' + id);
    }

    submitForm(formData: any) {
      return this.http.post(this.contactsBaseUrl, formData);
    }

    updateGuest(id:any, formData: any) {
      return this.http.put (this.contactsBaseUrl + '/' + id, formData);
    }
    getOneGuest(id:string) {
      return this.http.get<inventory[]> (this.contactsBaseUrl + '/' + id);
    }
}