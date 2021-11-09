import { Component, HostBinding, OnInit } from '@angular/core';
import { AngularMediaserverService } from 'angular-mediaserver-service';
import { Channel } from '@shared/models/channel';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  UrlTree,
} from '@angular/router';
import { Media } from '@shared/models/media';

@Component({
  selector: 'app-channels',
  templateUrl: './channels-list.component.html',
  styleUrls: ['./channels-list.component.scss'],
})
export class ChannelsListComponent implements OnInit {
  currentView: string = 'thumb';
  itemTypes: string[] = ['channels', 'videos', 'live_streams'];
  parentChannel?: Channel;
  currentChannel?: Channel;
  channelPath: Channel[] = [];
  channelsAndMedias: Channel[] | Media[] = [];
  isLoading: boolean = false;

  constructor(
    private msService: AngularMediaserverService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        this.channelsAndMedias = [];
      }
      if (event instanceof NavigationEnd) {
        const parsed_url = this.router.parseUrl(event.url);
        this.getChannelsAndMediasWithRouteParams(parsed_url);
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    if (this.channelsAndMedias.length === 0) this.getRootChannelsAndMedias();
  }

  getChannelsAndMediasWithRouteParams(parsed_url: UrlTree): void {
    const { slug, sort } = parsed_url.queryParams;
    this.getCurrentChannelContent(slug);
  }

  getCurrentChannelContent(slug: string): void {
    if (slug) {
      this.msService
        .getChannel(undefined, slug, undefined, undefined, true)
        .subscribe((res) => {
          this.currentChannel = res.info;
          this.channelPath = res.info.path;
          this.getChannelsAndMedias(res.info);
        });
    } else {
      this.currentChannel =undefined;
      this.getRootChannelsAndMedias();
    }
  }

  getRootChannelsAndMedias(): void {
    this.msService.getChannelContent().subscribe((res) => {
      this.channelsAndMedias = res.channels;
      this.isLoading = false;
    });
  }

  getChannelsAndMedias(parent_channel: Channel): void {
    this.msService
      .getChannelContent(undefined, parent_channel.slug)
      .subscribe((res) => {
        let itemsList: Channel[] | Media[];
        this.channelsAndMedias = [];
        for (const itemType of this.itemTypes) {
          itemsList = res[itemType] ? res[itemType] : [];
          this.channelsAndMedias.push(...itemsList);
        }
        this.isLoading = false;
      });
  }
}
