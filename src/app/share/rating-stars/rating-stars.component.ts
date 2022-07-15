import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit {
  @Input() classes 
  @Input() product 
  @Input() position = 'center center'
  constructor() { }

  ngOnInit(): void {
  }

  ratingColor(aux){
    return Number(aux) > 0 
  }

  starRating(number){
    number = Number(number)
    number = number > 0 ? number : 1
    return new Array(Math.floor(number)).fill(0)
  }

  reviewCounter(aux){
    return Number(aux) > 0 ? Math.floor(aux) : 'Not Rated Yet'
  }

}
