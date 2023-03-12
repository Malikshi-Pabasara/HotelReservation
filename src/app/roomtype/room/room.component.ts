import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Room } from "./room";
import { RoomService } from './room.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @Input() data !:string; 
  @Input() search!:string;
  @Input() Name!:string;
  ID !:string;
  toggle = true;
  status = 'Enable'; 
  Roomform: FormGroup;
  searchText: any;
  page: number = 1;
  rooms: Room[] = [];
 
  constructor(
    private roomService : RoomService,
    private router: Router,
    private modalService: NgbModal,
    public fb: FormBuilder,
  ) {
    this.Roomform = this.fb.group({
      id: new FormControl(''),
      roomNo: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required), 
      roomStatus: new FormControl('', Validators.required),
      roomTypeId: new FormControl('', Validators.required),
      isActive: new FormControl(''),
    })
  }

  get validation() {
    return this.Roomform.controls;
  }
  
  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe((response) => {
      this.rooms = response;
     
    });
  }
  setId(){
    this.ID = this.data;
  }

  deleteRow(id:string) {
    this.roomService.deleteRoom(id).subscribe((response) => {
        this.roomService.getAllRooms().subscribe(
          (response) => {
            this.rooms = response;
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  } 

  submitForm() {
    if(this.Roomform.value.isActive == "" || this.Roomform.value.isActive == null){
      this.Roomform.value.isActive = false;
    }
    this.roomService.submitForm(this.Roomform.value).subscribe(
      (response) => {
        this.roomService.getAllRooms().subscribe(
          (response) => {
            this.rooms = response;
            this.Roomform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }

  UpdateRoom(id:string) {
    if(this.Roomform.value.isActive == "" || this.Roomform.value.isActive == null){
      this.Roomform.value.isActive = false;
    }
    this.roomService.UpdateRoom(id,this.Roomform.value).subscribe((response) => {
        this.roomService.getAllRooms().subscribe(
          (response) => {
            this.rooms = response;
            this.Roomform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }
  
  open(content: any) {
    this.modalService.open(content, {size: 'sm', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
    this.Roomform.reset();
  }
  cancel() {
    this.ngOnInit()
  }
}
