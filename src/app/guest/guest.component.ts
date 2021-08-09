import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guest } from './guest';
import {GuestService} from './guest.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';
import { Ng2SearchPipe } from 'ng2-search-filter';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  Guestform: FormGroup;
  searchText: any;
  
  guests: Guest[] = [];
  mode = 'create';

  constructor(
    private guestService : GuestService,
    private router: Router,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    this.Guestform = this.fb.group({
      id: new FormControl(''),
      Name: new FormControl('', Validators.required),
      PhoneNo: new FormControl('',[ Validators.required, Validators.maxLength(10)]), 
      DateOfBirth: new FormControl('', Validators.required),
      IdNo: new FormControl('' , [ Validators.required, Validators.maxLength(10)]), 
      Email: new FormControl('', [Validators.required, Validators.email]),
      IsActive: new FormControl(''),
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
      this.Guestform.reset();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.Guestform.reset();
      return 'by clicking on a backdrop';
    } else {
      this.Guestform.reset();
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
            this.Guestform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )};

   
  }

  

