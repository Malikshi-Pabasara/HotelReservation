import { HttpClient } from "@angular/common/http";  //call API
import { Injectable } from "@angular/core";  //service
import { Room } from "./room";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";

@Injectable({  //identify service
    providedIn: 'root',
})

export class RoomService {
    
    contactsBaseUrl: string = environment.serverBaseUrl;
    constructor(private http : HttpClient, private router: Router, public fb: FormBuilder){
    }

    getAllRooms() {
      return this.http.get<Room[]>(this.contactsBaseUrl + '/rooms');
    }
    deleteRoom(id: string) {
      return this.http.delete(this.contactsBaseUrl + '/rooms'+'/' + id);
    }
    submitForm(formData: any) {
      return this.http.post(this.contactsBaseUrl + '/rooms', formData);
    }

    UpdateRoom(id:string, formData: any) {
      return this.http.put (this.contactsBaseUrl + '/rooms'+ '/' + id, formData);
    }
}
