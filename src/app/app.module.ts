import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GuestComponent } from './guest/guest.component';
import { RoomComponent } from './roomtype/room/room.component';
import { ReservationComponent } from './reservation/reservation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { RoomtypeComponent } from './roomtype/roomtype.component';
import { NewReservationComponent } from './reservation/new-reservation/new-reservation.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GuestComponent,
    RoomComponent,
    ReservationComponent,
    AuthComponent,
    RoomtypeComponent,
    NewReservationComponent,
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    FormsModule,
    FlexLayoutModule,
    NgSelectModule,

    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
