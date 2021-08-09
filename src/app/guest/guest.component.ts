import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guest } from './guest';
import {GuestService} from './guest.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  Guestform: FormGroup;
 

  guests: Guest[] = [];
  mode = 'create';

  constructor(
    private guestService : GuestService,
    private router: Router,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    this.Guestform = this.fb.group({
      id:[''],
      Name: ['', Validators.required],
      PhoneNo: ['', Validators.required, Validators.maxLength(10)],
      DateOfBirth: ['', Validators.required],
      IdNo: ['', Validators.required, Validators.maxLength(10)],
      Email: ['', Validators.required, Validators.email],
      IsActive: [''],
  })
  }
  get validation(){
    return this.Guestform.controls;
  }

  ngOnInit(): void {

    this.guestService.getAllContacts().subscribe((response) => {
      this.guests = response;
    });
  }

  deleteRow(id:string){
    this.guestService.deleteGuest(id).subscribe((response) => {
        this.guestService.getAllContacts().subscribe(
          (response) => {
            this.guests = response;
            this.router.navigate(['/guest']);
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )};
      


  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  submitForm() {
    this.guestService.submitForm(this.Guestform.value).subscribe(
      (response) => {
        this.guestService.getAllContacts().subscribe(
          (response) => {
            this.guests = response;
            this.router.navigate(['/guest']);
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )};

  }

