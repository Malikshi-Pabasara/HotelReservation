import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from "./Item";
import {HSKPService} from './hskp.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-hskp-manager',
  templateUrl: './hskp-manager.component.html',
  styleUrls: ['./hskp-manager.component.css']
})
export class HskpManagerComponent implements OnInit {
  Hskpform: FormGroup;
  searchText: any;
  page:number = 1;
  items: Item[] = [];
  mode = 'create';

  constructor(
    private hskpService : HSKPService,
    private router: Router,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    this.Hskpform = this.fb.group({
      itemsId: new FormControl(''),
      description: new FormControl(''),
      lostDate: new FormControl('',[ Validators.required]), 
      lostIn: new FormControl(''),
      reportBy: new FormControl(''), 
      foundDate: new FormControl(''),
      status: new FormControl(''),
    });
  }

  get validation() {
    return this.Hskpform.controls;
  }

  ngOnInit(): void {
    this.hskpService.getAllContacts().subscribe((response) => {
      this.items = response;
    });
  }

  deleteRow(id:string) {
    this.hskpService.deleteGuest(id).subscribe((response) => {
        this.hskpService.getAllContacts().subscribe(
          (response) => {
            this.items = response;
            this.router.navigate(['/hskp']);
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }
      
  submitForm() {
    debugger
    this.hskpService.submitForm(this.Hskpform.value).subscribe(
      (response) => {
        this.hskpService.getAllContacts().subscribe(
          (response) => {
            this.items = response;
            this.router.navigate(['/hskp']);
            this.Hskpform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }

  updateGuest(id:string) {
    this.hskpService.updateGuest(id,this.Hskpform.value).subscribe((response) => {
        this.hskpService.getAllContacts().subscribe(
          (response) => {
            this.items = response;
            this.router.navigate(['/hskp']);
            this.Hskpform.reset();
          },
          (error) => console.log(error)
        );
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
    this.Hskpform.reset();
  }

  cancel() {
    this.ngOnInit()
  }

}


  

