import { Component, Input, OnInit } from '@angular/core';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-thumb-item',
  templateUrl: './thumb-item.component.html',
  styleUrls: ['./thumb-item.component.scss']
})
export class ThumbItemComponent implements OnInit {
  @Input() item!: any;

  constructor() {
   }

  ngOnInit(): void {
  }

}
