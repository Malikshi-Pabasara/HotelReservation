import { HttpClient } from "@angular/common/http";  //call API
import { Injectable } from "@angular/core";  //service
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";
import { Reservation } from "./reservation";

@Injectable({  //identify service
    providedIn: 'root',
})

export class ReservationService{
    
    contactsBaseUrl: string = environment.serverBaseUrl + '/orders';
    constructor(private http : HttpClient, private router: Router, public fb: FormBuilder){
    }

    getOrders(){
      return this.http.get<Reservation[]>(this.contactsBaseUrl);
    } 

    deleteOrder(id: string) {
      return this.http.delete(this.contactsBaseUrl + '/' + id);
    }

    submitForm(formData: any) {
      return this.http.post(this.contactsBaseUrl, formData);
    }

    UpdateOrder(id:string, formData: any){
      return this.http.put (this.contactsBaseUrl + '/' + id, formData);
    }
}