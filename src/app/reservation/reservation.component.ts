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
      id: new FormControl(''),
      ReservationNo: new FormControl(''),
      GuestId: new FormControl('',Validators.required), 
      RoomId: new FormControl('', Validators.required),
      ArrivalDate: new FormControl('' , Validators.required), 
      DepartureDate: new FormControl('', Validators.required),
      Notes: new FormControl(''),
      Status: new FormControl('')
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
        const room = this.rooms.find(r => r.id == reservation.RoomId);
        reservation.RoomNo = room != undefined ? room.RoomNo : 'NA';
        const email = this.guests.find(e => e.id == reservation.GuestId);
        reservation.GuestEmail = email != undefined ? email.Email : 'NA';
        const guest = this.guests.find(g => g.id == reservation.GuestId);
        reservation.GuestName = guest != undefined ? guest.Name : 'NA';

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
    const reservation = this.reservations.find(r => r.id == id);
    if(reservation != undefined){
      reservation.Status= "Checked In";
      this.reservationService.UpdateOrder(id,reservation).subscribe((response) => {
        this.ngOnInit();
      },
      (error) => console.log(error)
    )}
  }
  checkOut(id:string){
    const reservation = this.reservations.find(r => r.id == id);
    if(reservation != undefined){
      reservation.Status= "Checked Out";
      this.reservationService.UpdateOrder(id,reservation).subscribe((response) => {
        this.ngOnInit();
      },
      (error) => console.log(error)
    )}
  }
}
