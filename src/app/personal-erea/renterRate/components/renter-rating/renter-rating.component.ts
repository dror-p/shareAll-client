import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { renterRatingService } from '../../services/renterRating.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-renter-rating',
  templateUrl: './renter-rating.component.html',
  styleUrls: ['./renter-rating.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RenterRatingComponent implements OnInit {

  selectedRating = 0;
  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star'
    }
  ];

  constructor(private renterRatingService: renterRatingService) { }

  ngOnInit(): void {}

  selectStar(value: number): void {
    // prevent multiple selection
  if ( this.selectedRating === 0){

      this.stars.filter( (star) => {

        if ( star.id <= value){

          star.class = 'star-gold star';

        }else{

          star.class = 'star-gray star';

        }        
        return star;
      });

    }
    this.selectedRating = value;

    //call The Service
    this.renterRatingService.saveNewRate(this.selectedRating, 'pacher@gmail.com'); //this.selectedRating
/* 
    this.renterRatingService.saveNewRate(this.selectedRating, 3).subscribe(x => {
      Swal.fire(
        'הדירוג בוצע בהצלחה!',
        '',
        'success'
      ).then(x=> {
        //this.router.navigate(['/products-view/'], {queryParams: {type: this.type}})
      })
    },
    err => {
      Swal.fire(
      'יש לנו בעיה!',
      'המשתמש לא דורג, אנא פנה לתמיכה טכנית',
      'error'
      )
    }); */
  }
}