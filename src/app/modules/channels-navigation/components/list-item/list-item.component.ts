import { Component, Input } from '@angular/core';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() item!: any;
}
