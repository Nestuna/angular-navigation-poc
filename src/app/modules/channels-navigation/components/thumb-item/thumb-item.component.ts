import { Component, Input } from '@angular/core';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-thumb-item',
  templateUrl: './thumb-item.component.html',
  styleUrls: ['./thumb-item.component.scss']
})
export class ThumbItemComponent {
  @Input() item!: any;
}
