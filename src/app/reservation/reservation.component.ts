import { Component, OnInit } from '@angular/core';
import { Reservation } from './reservation';
import {ReservationService} from './reservation.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';
import { GuestService } from 'src/app/guest/guest.service';
import { RoomService } from '../roomtype/room/room.service';
import { Room } from '../roomtype/room/room';
import { Guest } from '../guest/guest';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  disableMessage = true;
  Reservationform: FormGroup;
  searchText: any;
  page:number = 1;
  guests: Guest[] = [];
  rooms: Room[] = [];
  reservations: Reservation[] = [];
  
  constructor(
    private reservationService : ReservationService,
    private guestService : GuestService,
    private roomService : RoomService,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    this.Reservationform = this.fb.group({
      orderId: new FormControl(''),
      reservationNo: new FormControl(''),
      guestId: new FormControl('',Validators.required), 
      roomId: new FormControl('', Validators.required),
      arrivalDate: new FormControl('' , Validators.required), 
      departureDate: new FormControl('', Validators.required),
      notes: new FormControl(''),
      status: new FormControl('')
    });
  }
  get validation() {
  return this.Reservationform.controls;
  }

  ngOnInit(): void {
    
    forkJoin({
      guestResponse: this.guestService.getAllContacts(),
      roomResponse: this.roomService.getAllRooms(),
      reservationResponse: this.reservationService.getOrders()
    })
    .subscribe((response) => {
      this.guests = response.guestResponse;
      this.rooms = response.roomResponse;
      this.reservations = response.reservationResponse.map(reservation => {
        const room = this.rooms.find(r => r.id == reservation.roomId);
        reservation.roomNo = room != undefined ? room.roomNo : 'NA';
        const email = this.guests.find(e => e.id == reservation.guestId);
        reservation.guestEmail = email != undefined ? email.email : 'NA';
        const guest = this.guests.find(g => g.id == reservation.guestId);
        reservation.guestName = guest != undefined ? guest.name : 'NA';
        return reservation;
      });
    });
  }
  deleteRow(id:string){
    this.reservationService.deleteOrder(id).subscribe((response) => {
      this.ngOnInit();
      },
      (error) => console.log(error)
    )
  }
      
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
  }

  UpdateGuest(id:string){
    debugger
    this.reservationService.UpdateOrder(id,this.Reservationform.value).subscribe((response) => {
       this.ngOnInit();
      },
      (error) => console.log(error)
    )
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

  clearModalData() {
    this.Reservationform.reset();
  } 

  cancel() {
    this.ngOnInit()
  }

  checkIn(id:string){
    const reservation = this.reservations.find(r => r.orderId == id);
    if(reservation != undefined){
      reservation.status= "Checked In";
      this.reservationService.UpdateOrder(id,reservation).subscribe((response) => {
        this.ngOnInit();
      },
      (error) => console.log(error)
    )}
  }
  checkOut(id:string){
    const reservation = this.reservations.find(r => r.orderId == id);
    if(reservation != undefined){
      reservation.status= "Checked Out";
      this.reservationService.UpdateOrder(id,reservation).subscribe((response) => {
        this.ngOnInit();
      },
      (error) => console.log(error)
    )}
  }
}
