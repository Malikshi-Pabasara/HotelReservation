import { HttpClient } from "@angular/common/http";  //call API
import { Injectable } from "@angular/core";  //service
import { BehaviorSubject } from "rxjs";
import { Guest } from "./guest";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({  //identify service
    providedIn: 'root',
})

export class GuestService{
    form: any;
    constructor(private http : HttpClient, private router: Router){}

    guests: Guest[] = [];
    guests$ = new BehaviorSubject<Guest[]>([]);

    getAllContacts(){
        this.http
        .get<Guest[]>('http://localhost:3000/contacts') 
        .subscribe((response) => {
            this.guests = response;
            this.guests$.next(this.guests);
        });
        
    } 
    deleteGuest(id: string) {
        const guests = this.guests.filter((guest) => guest.id != id);
        this.http
          .delete('http://localhost:3000/contacts/' + id)
          .subscribe(() => {
            this.guests$.next(guests);
          });
      }

      submitForm() {
        var formData: any = new FormData();
        formData.append("id", this.form.get('id').value);
        formData.append("Name", this.form.get('name').value);
        formData.append("PhoneNo", this.form.get('PhoneNo').value);
        formData.append("Email", this.form.get('email').value);
        formData.append("IdNo", this.form.get('IdNo').value);
        formData.append("DateOfBirth", this.form.get('DoB').value);
        formData.append("IsActive", this.form.get('IsActive').value);

        this.http
        .post('http://localhost:3000/contacts', formData)
        .subscribe((response) =>  this.router.navigate(['/guest']),
          (error) => console.log(error)
        )
      }
}