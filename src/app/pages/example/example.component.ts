import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const Swiper: any;
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements AfterViewInit {
  name = 'Angular with Swiper';
  mySwiper: any;
  slides = [
    'https://via.placeholder.com/300x200/FF5733/ffffff',
    'https://via.placeholder.com/300x200/C70039/ffffff',
    'https://via.placeholder.com/300x200/900C3F/ffffff'
  ];

  constructor() { }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      autoplay: 3000,
      spaceBetween: 30
    });
  }
}
