import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';
import { RoomtypeService } from './roomtype.service';
import { Roomtype } from "./roomtype";

@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.css']
})
export class RoomtypeComponent implements OnInit {

  RoomTypeID!: string;
  closeResult = '';
  Roomtypeform: FormGroup;
  roomtypes: Roomtype[] = [];
  searchText: any;

  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private roomtypeService : RoomtypeService,
  ) {
    this.Roomtypeform = this.fb.group({
      id: new FormControl(''),
      Name: new FormControl('', Validators.required),
      Code: new FormControl('', Validators.required)
    });
  }

  get validation() {
    return this.Roomtypeform.controls;
  }

  ngOnInit(): void {
    this.roomtypeService.getAllRoomType().subscribe((response) => {
      this.roomtypes = response;
      this.getId(this.roomtypes[0].id);
    });
  }
  submitForm() {
    this.roomtypeService.submitForm(this.Roomtypeform.value).subscribe(
      (response) => {
        this.roomtypeService.getAllRoomType().subscribe(
          (response) => {
            this.roomtypes = response;
            this.Roomtypeform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  };

  deleteRow() {
    this.roomtypeService.deleteRoomType(this.RoomTypeID).subscribe((response) => {
        this.roomtypeService.getAllRoomType().subscribe(
          (response) => {
            this.roomtypes = response;
            this.getId(this.roomtypes[0].id);
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  };

  UpdateRoom(id: string) {
    this.roomtypeService.UpdateRoomtype(id,this.Roomtypeform.value).subscribe((response) => {
        this.roomtypeService.getAllRoomType().subscribe(
          (response) => {
            this.roomtypes = response;
            this.Roomtypeform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  };

  getDAta(id: string ) {
    this.RoomTypeID = id;
  }

  cancel() {
    this.ngOnInit()
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
    this.Roomtypeform.reset();
  } 

  getId(id:string) {
    this.RoomTypeID=id;
  }
}
