import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { login } from './login';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Loginform: FormGroup;

  constructor(public fb: FormBuilder) {
    this.Loginform = this.fb.group({
    id: new FormControl(''),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    })
  }

  get validation(){
    return this.Loginform.controls;
  }

  ngOnInit(): void {
  }
 
}
