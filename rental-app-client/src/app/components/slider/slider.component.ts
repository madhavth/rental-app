import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/app/model/property';

@Component({
  selector: 'app-slider',
  template: `
    <div
      class="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4"
    >
      <div class="w-full relative flex items-center justify-center">
        <button
          aria-label="slide backward"
          class="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
          (click)="goPrev()"
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1L1 7L7 13"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div class="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
          <div
            id="slider"
            class="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
          >
            <div
              *ngFor="let item of items"
              class="flex flex-shrink-0 relative w-full sm:w-auto"
            >
              <app-card [cardData]="item" [callBackFn]="callBackFn"></app-card>
            </div>
          </div>
        </div>
        <button
          aria-label="slide forward"
          class="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          (click)="goNext()"
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L1 13"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class SliderComponent implements OnInit {
  @Input() items!: Array<Property>;
  @Input() callBackFn!: Function;
  slider!: any;
  defaultTransform!: number;
  goNext() {
    this.defaultTransform = this.defaultTransform - 398;
    if (Math.abs(this.defaultTransform) >= this.slider.scrollWidth / 1.7)
      this.defaultTransform = 0;
    this.slider.style.transform = 'translateX(' + this.defaultTransform + 'px)';
  }
  goPrev() {
    if (Math.abs(this.defaultTransform) === 0) this.defaultTransform = 0;
    else this.defaultTransform = this.defaultTransform + 398;
    this.slider.style.transform = 'translateX(' + this.defaultTransform + 'px)';
  }
  constructor() {}

  ngOnInit(): void {
    this.slider = document.getElementById('slider');
    this.defaultTransform = 0;
  }
}
