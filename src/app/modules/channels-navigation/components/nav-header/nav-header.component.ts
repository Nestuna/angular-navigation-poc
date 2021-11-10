import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel } from 'angular-mediaserver-service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnInit {
  @Input() currentChannel?: Channel;
  @Input() channelPath: Channel[] = [];
  @Input() view!: string;
  @Output() viewChange = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  onToggleViewClick(newView: string): void {
    this.view = newView;
    this.viewChange.emit(this.view);
  }

  selectSort(newSort: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: newSort},
      queryParamsHandling: 'merge'
    })
  }
}
