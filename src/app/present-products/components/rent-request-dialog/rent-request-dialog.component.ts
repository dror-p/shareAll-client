import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from '../../services/products.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-rent-request-dialog',
  templateUrl: './rent-request-dialog.component.html',
  styleUrls: ['./rent-request-dialog.component.less']
})
export class RentRequestDialogComponent implements OnInit {
  currProduct: any;
  user: any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<RentRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currProduct = data.product;
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      const user = localStorage.getItem('user');
      this.user = JSON.parse(user || '{}');
    }

  }

  submitRequst() {
    this.productService.requestRent(this.currProduct, this.range.value.start, this.range.value.end, this.user._id).subscribe(res=>{
      Swal.fire(
        'בקשה להשכרה בוצעה בהצלחה!',
        '',
        'success'
      );
    });
  }
}
