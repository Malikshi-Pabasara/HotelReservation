import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation';
import { GuestService } from 'src/app/guest/guest.service';
import { Guest } from 'src/app/guest/guest';
import { RoomService } from 'src/app/roomtype/room/room.service';
import { Room } from 'src/app/roomtype/room/room';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {

  Reservationform: FormGroup;
  guests: Guest[] = [];
  rooms: Room[] = [];
  reservations:Reservation[] = [];
  GuestId!: string;
  Guestform: FormGroup;
  Roomform: FormGroup;
  newReservationNo!: string;

  constructor(
    private reservationService : ReservationService,
    private guestService : GuestService,
    private roomService : RoomService,
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
      DepartureTime: new FormControl(''),
      Status: new FormControl('', Validators.required),
      ArrivalTime: new FormControl(''),
      NumNight: new FormControl(''),
      child: new FormControl(''),
      Adults: new FormControl(''),
    }),
    this.Guestform = this.fb.group({
      id: new FormControl(''),
      Name: new FormControl(''),
      PhoneNo: new FormControl(''), 
      DateOfBirth: new FormControl(''),
      IdNo: new FormControl(''), 
      Email: new FormControl(''),
      IsActive: new FormControl(''),
    }),
    this.Roomform = this.fb.group({
      id: new FormControl(''),
      RoomNo: new FormControl(''),
      Price: new FormControl(''), 
      RoomStatus: new FormControl(''),
      RoomTypeId: new FormControl(''),
      IsActive: new FormControl(''),
    })
  }

  get validation(){
  return this.Reservationform.controls;
  }
  
  ngOnInit(): void {
    this.guestService.getAllContacts().subscribe((response) => {
      this.guests = response;
    });
    this.roomService.getAllRooms().subscribe((response) => {
      this.rooms = response;
    });
    this.reservationService.getOrders().subscribe((response) => {
      this.reservations = response;
      const reservation = this.reservations.sort((a, b) => b.ReservationNo.localeCompare(a.ReservationNo));
      const lastReservationNo = reservation[0].ReservationNo;
      const split = lastReservationNo.split(/['OB']/);
      this.newReservationNo = 'OB'+('00000'+(Number(split[2])+1)).slice(-6);
    });
  }

  displayGuestName(id?: any) {
    const guest = this.guests.find(g => g.id == id);
    return id && guest ? guest.Name : '';
  }
  displayRoomNo(id?: any) {
    const room = this.rooms.find(r => r.id == id);
    return id && room ? room.RoomNo : '';
  }
  submitForm() {
    this.reservationService.submitForm(this.Reservationform.value).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (error) => console.log(error)
    )
  }
  cancel() {
    this.Guestform.reset();
    this.Reservationform.reset();
    this.Roomform.reset();
  }
}
