import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './guest/guest.component';
import { LoginComponent } from './login/login.component';
import { NewReservationComponent } from './reservation/new-reservation/new-reservation.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomComponent } from './roomtype/room/room.component';
import { RoomtypeComponent } from './roomtype/roomtype.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { HskpManagerComponent } from './hskp-manager/hskp-manager.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'guest', component:GuestComponent},
  {path:'reservation', component:ReservationComponent},
  {path:'room', component:RoomComponent},
  {path:'roomtype', component:RoomtypeComponent},
  {path: 'newreservation', component:NewReservationComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'inventory', component:InventoryComponent},
  {path: 'hskp', component:HskpManagerComponent},
  {path: 'report', component:ReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
