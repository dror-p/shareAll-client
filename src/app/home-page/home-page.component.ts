import { Component, OnInit } from '@angular/core';
import {eProductType} from '../shared/enums/eProductType';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {

  eProductType = eProductType;

  constructor() { }

  ngOnInit(): void {
  }

}
