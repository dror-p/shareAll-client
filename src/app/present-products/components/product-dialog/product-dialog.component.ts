import {AfterViewInit, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/products.service';
import { renterRatingService } from '../../../personal-erea/renterRate/services/renterRating.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.less'],
  providers: [ProductService],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductDialogComponent implements AfterViewInit{

  currProduct: Product;
  slideIndex: number = 1;
  showPrev: boolean = false;
  showNext: boolean = false;
  currUserRate: number = 0;
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

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private renterRatingService: renterRatingService) {
      this.currProduct = data.product;
      this.productService.getUserRateByEmail(this.currProduct.users[0]).then(val => {
        this.currUserRate = val;
      })      
  }

  ngAfterViewInit() {
    if(!!this.currProduct.photos && this.currProduct.photos.length > 0) {
      this.showSlides(this.slideIndex);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


// Next/previous controls
  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

// Thumbnail image controls
  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {this.slideIndex = 1}
    for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute("style", "display: none;");
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }    
    slides[this.slideIndex - 1].setAttribute("style", "display: block;");
    dots[this.slideIndex - 1].className += " active";

    if(this.slideIndex === 1 ) { this.showPrev = false; } else { this.showPrev = true; }
    if(this.slideIndex === this.currProduct.photos.length ) { this.showNext = false; } else { this.showNext = true; }
  }

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
    this.renterRatingService.saveNewRate(this.selectedRating, this.currProduct.users[0]); //this.selectedRating

  }
}
