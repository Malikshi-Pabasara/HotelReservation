import { Component, OnInit } from '@angular/core';
import { Guest } from '../guest/guest';
import { GuestService } from '../guest/guest.service';
import { Reservation } from '../reservation/reservation';
import { ReservationService } from '../reservation/reservation.service';
import { Room } from '../roomtype/room/room';
import { RoomService } from '../roomtype/room/room.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  disableMessage = true;
  searchText: any;
  page:number = 1;
  guests: Guest[] = [];
  rooms: Room[] = [];
  reservations: Reservation[] = [];
  
  constructor(
    private reservationService : ReservationService,
    private guestService : GuestService,
    private roomService : RoomService,) { }

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
}
