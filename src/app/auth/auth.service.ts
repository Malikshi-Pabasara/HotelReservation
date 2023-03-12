import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  contactsBaseUrl: string = environment.serverBaseUrl + '/users';

  constructor(private http : HttpClient, private router: Router, public fb: FormBuilder) {
  }
  
  submitForm(formData: any) {
    return this.http.post(this.contactsBaseUrl, formData);
  }
}