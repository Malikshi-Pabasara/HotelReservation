import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './guest/guest.component';
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomComponent } from './roomtype/room/room.component';
import { RoomtypeComponent } from './roomtype/roomtype.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'guest', component:GuestComponent},
  {path:'reservation', component:ReservationComponent},
  {path:'room', component:RoomComponent},
  {path:'roomtype', component:RoomtypeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
