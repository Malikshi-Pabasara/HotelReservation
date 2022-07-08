import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';
import { Router } from '@angular/router';
import { inventory } from './inventory';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  Hskpform: FormGroup;
  searchText: any;
  page:number = 1;
  inventories: inventory[] = [];
  mode = 'create';

  constructor(
    private inventoryService : InventoryService,
    private router: Router,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    this.Hskpform = this.fb.group({
      inventoryId: new FormControl(''),
      categoryId: new FormControl(''),
      quantity: new FormControl('',[ Validators.required]), 
      date: new FormControl('', Validators.required),
      name: new FormControl('' , [ Validators.required]), 
      code: new FormControl(''),
      notes: new FormControl(''),
      status : new FormControl(''),
    });
  }

  get validation() {
    return this.Hskpform.controls;
  }

  ngOnInit(): void {
    this.inventoryService.getAllContacts().subscribe((response) => {
      this.inventories = response;
    });
  }

  deleteRow(id:string) {
    this.inventoryService.deleteGuest(id).subscribe((response) => {
        this.inventoryService.getAllContacts().subscribe(
          (response) => {
            this.inventories = response;
            this.router.navigate(['/inventory']);
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }
      
  submitForm() {
    this.inventoryService.submitForm(this.Hskpform.value).subscribe(
      (response) => {
        this.inventoryService.getAllContacts().subscribe(
          (response) => {
            this.inventories = response;
            this.router.navigate(['/inventory']);
            this.Hskpform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }

  updateGuest(id:any) {
    console.log(id);
    const InentoryId = id;
    this.Hskpform.value.inventoryId = id;
    this.inventoryService.updateGuest(id,this.Hskpform.value).subscribe((response) => {
        this.inventoryService.getAllContacts().subscribe(
          (response) => {
            this.inventories = response;
            this.router.navigate(['/inventory']);
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


  


