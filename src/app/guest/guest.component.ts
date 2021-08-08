import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guest } from './guest';
import {GuestService} from './guest.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  form!: FormGroup;
  guests: Guest[] = [];
  mode = 'create';

  constructor(
    private guestService : GuestService,
    private router: Router,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      rowForm: this.fb.group({
      name: [''],
      PhoneNo: [''],
      DoB: [''],
      IdNo: [''],
      email: [''],
      IsActive: [''],
    })
  })
   }

/*

  guestform = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),

    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),

    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),

    nic: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    }),

    mobile: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    }),
    vehicleNumber: new FormControl('', { validators: [Validators.required] }),
    vehicleColor: new FormControl('', { validators: [Validators.required] }),
    image: new FormControl(''),
  });

  
*/

  ngOnInit(): void {

    this.guestService.getAllContacts()
    this.guestService.guests$.subscribe((guests$)=>{
    this.guests = guests$
      console.log(this.guests)
      
    })
  }

  deleteRow(id:string){
    this.guestService.deleteGuest(id),
    this.guestService.getAllContacts()
  }


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
    console.log(this.form.value)
  }

  }

