import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from './reservation';
import {ReservationService} from './reservation.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  Reservationform: FormGroup;
  searchText: any;
  page:number = 1;
  reservations: Reservation[] = [];
  reservationID! : string;

  constructor(
    private reservationService : ReservationService,
    private router: Router,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    this.Reservationform = this.fb.group({
      id: new FormControl(''),
      ReservationNo: new FormControl(''),
      GuestId: new FormControl('',Validators.required), 
      RoomId: new FormControl('', Validators.required),
      ArrivalDate: new FormControl('' , Validators.required), 
      DepartureDate: new FormControl('', Validators.required),
      Notes: new FormControl(''),
  })
   }
  get validation(){
  return this.Reservationform.controls;
  }

  ngOnInit(): void {
    this.reservationService.getOrders().subscribe((response) => {
      this.reservations = response;
    });
  }
  deleteRow(id:string){
    this.reservationService.deleteOrder(id).subscribe((response) => {
        this.reservationService.getOrders().subscribe(
          (response) => {
            this.reservations = response;
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  };
      
  submitForm() {
    this.reservationService.submitForm(this.Reservationform.value).subscribe(
      (response) => {
        this.reservationService.getOrders().subscribe(
          (response) => {
            this.reservations = response;
            this.Reservationform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  };

  UpdateGuest(id:string){
    this.reservationService.UpdateOrder(id,this.Reservationform.value).subscribe((response) => {
        this.reservationService.getOrders().subscribe(
          (response) => {
            this.reservations = response;
            this.Reservationform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  };
  
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

  clearModalData() {
    this.Reservationform.reset();
  } 

  cancel() {
    this.ngOnInit()
  }

  getId(id:string){
    this.reservationID = id;
  }

}
