import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Channel } from '@shared/models/channel';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnInit {
  @Input() currentChannel?: Channel;
  @Input() channelPath: Channel[] = [];
  @Input() view!: string;
  @Output() viewChange = new EventEmitter<string>();;
  @Output() sort = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {

  }

  onToggleViewClick(newView: string):void {
    this.view = newView;
    this.viewChange.emit(this.view);
  }

  selectSort(newSort: string):void {
    this.sort.emit(newSort)
  }
}
