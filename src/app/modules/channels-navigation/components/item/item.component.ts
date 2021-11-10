import { Component, Input, OnInit } from '@angular/core';
import { Channel, Media } from 'angular-mediaserver-service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  hostUrl = environment.apiUrl;
  urlsByType: Record<string, string> = {
    c: '/channels',
    v: this.hostUrl + '/videos',
    l: this.hostUrl + '/lives',
  };
  itemUrl?: string;

  @Input() item!: Channel | Media;
  @Input() view!: string;

  constructor() {}

  ngOnInit(): void {
    this.itemUrl = this.item.type
      ? this.urlsByType[this.item.type] + '/' + this.item.slug
      : '';
  }
}
