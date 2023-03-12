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
      reservationNo: new FormControl(''),
      guestId: new FormControl('',Validators.required), 
      roomId: new FormControl('', Validators.required),
      arrivalDate: new FormControl('' , Validators.required), 
      departureDate: new FormControl('', Validators.required),
      notes: new FormControl(''),
      departureTime: new FormControl(''),
      status: new FormControl('', Validators.required),
      arrivalTime: new FormControl(''),
      numNight: new FormControl(''),
      child: new FormControl(''),
      adults: new FormControl(''),
    }),
    this.Guestform = this.fb.group({
      id: new FormControl(''),
      name: new FormControl(''),
      phoneNo: new FormControl(''), 
      dateOfBirth: new FormControl(''),
      idNo: new FormControl(''), 
      email: new FormControl(''),
      isActive: new FormControl(''),
    }),
    this.Roomform = this.fb.group({
      id: new FormControl(''),
      roomNo: new FormControl(''),
      price: new FormControl(''), 
      roomStatus: new FormControl(''),
      roomTypeId: new FormControl(''),
      isActive: new FormControl(''),
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
      const reservation = this.reservations.sort((a, b) => b.reservationNo.localeCompare(a.reservationNo));
      const lastReservationNo = reservation[0].reservationNo;
      const split = lastReservationNo.split(/['OB']/);
      this.newReservationNo = 'OB'+('00000'+(Number(split[2])+1)).slice(-6);
    });
  }

  displayGuestName(id?: any) {
    const guest = this.guests.find(g => g.id == id);
    return id && guest ? guest.name : '';
  }
  displayRoomNo(id?: any) {
    const room = this.rooms.find(r => r.id == id);
    return id && room ? room.roomNo : '';
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
