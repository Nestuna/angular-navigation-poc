import { Component, Input } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { Channel, Media } from 'angular-mediaserver-service';

@Component({
  selector: 'app-thumb-item',
  templateUrl: './thumb-item.component.html',
  styleUrls: ['./thumb-item.component.scss']
})
export class ThumbItemComponent {
  @Input() item!: Channel | Media;

  constructor() {
    this.item = {};
  }
}
