import { Component, OnInit } from '@angular/core';
import { AngularMediaserverService } from 'angular-mediaserver-service';
import { CommonUtils as utils } from '@shared/utils/common';
import { Channel } from '@shared/models/channel';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-channels',
  templateUrl: './channels-list.component.html',
  styleUrls: ['./channels-list.component.scss'],
})
export class ChannelsListComponent implements OnInit {
  declare parentChannelOid: string | null;
  rootChannelsList?: any[];
  channelsList: Channel[] = [];
  empty?: boolean;

  constructor(
    private msService: AngularMediaserverService,
    private router: Router
  ) {
    utils.checkConnection(this.msService);

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        const urlTree = this.router.parseUrl(event.url);
        this.parentChannelOid = urlTree.queryParams.parent;
        this.ngOnInit();
      }

      if (event instanceof NavigationError) {
        console.error(event.error);
      }
    });
  }

  ngOnInit(): void {
    if (this.parentChannelOid === null) {
      this.getRootChannelsList();
    } else {
      this.getSubChannelsList(this.parentChannelOid);
    }
  }

  getRootChannelsList(): void {
    this.msService.getChannelsList().subscribe((res) => {
      for (const channel of res.channels) {
        this.getChannelData(channel.oid);
      }
    });
  }

  getSubChannelsList(parent_oid: string): void {
    this.msService
      .getChannelContent((parent_oid = parent_oid))
      .subscribe((res) => {
        this.channelsList = res.channels;
      });
  }

  getChannelData(oid: string): void {
    this.msService.getChannel(oid).subscribe((res) => {
      this.channelsList.push(res.info);
    });
  }
}
