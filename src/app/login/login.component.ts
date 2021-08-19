import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Loginform: FormGroup;

  constructor(public fb: FormBuilder, private authService:AuthService,) {
    this.Loginform = this.fb.group({
    id: new FormControl(''),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    })
  }

  get validation() { 
    return this.Loginform.controls;
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.submitForm(this.Loginform.value).subscribe(
      (response) => {
          this.Loginform.reset();
        },
      (error) => console.log(error)
    )
  }
}
