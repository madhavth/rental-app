import { Component } from '@angular/core';
import { Property } from './model/property';
import { Utils } from './utils/Utils';

@Component({
  selector: 'app-root',
  template: '<app-card [cardData]="cardData"></app-card>',
  styles: [],
})
export class AppComponent {
  cardData: Property = {
    name: 'Humgain ko sampati',
    propertyImages: [
      {
        img: 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80',
      },
      {
        img: 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80',
      },
    ],
    description:
      'Here are the biggest enterprise technology acquisitions of 2021 sofar, in reverse chronological order.',
    price: 400,
    avgRating: { ...Utils.convertNumToArray(4.9) },
  };
  title = 'rental-app-client';
}
