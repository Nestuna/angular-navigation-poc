import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-toggle-view-button',
  templateUrl: './toggle-view-button.component.html',
  styleUrls: ['./toggle-view-button.component.scss'],
})
export class ToggleViewButtonComponent implements OnInit {
  @Input() currentView!: string;
  @Output() viewChange = new EventEmitter<string>();

  views_icons: Record<string, string> = {
    list: 'view_list',
    thumb: 'grid_view',
    table: 'table_view'
  }
  views: string[] = Object.keys(this.views_icons)

  constructor() {
    this.currentView = '';
  }

  ngOnInit(): void {
    return
  }

  onToggleViewClick(newViewEvent: MatButtonToggleChange): void {
    this.currentView = newViewEvent.value;
    this.viewChange.emit(this.currentView);
  }
}
