import { Component,  OnInit } from '@angular/core';
import { Channel, Media, AngularMediaserverService } from 'angular-mediaserver-service';
import {  } from 'angular-mediaserver-service'
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  UrlTree,
} from '@angular/router';

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
        this.channelsAndMediasWithRouteParams(parsed_url);
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    if (this.channelsAndMedias.length === 0) this.getRootChannelsAndMedias();
  }

  channelsAndMediasWithRouteParams(parsed_url: UrlTree): void {
    const { slug, sort } = parsed_url.queryParams;
    this.getCurrentChannelContent(slug);
  }

  getCurrentChannelContent(slug: string): void {
    if (slug) {
      this.msService
        .channel({slug,  full: true})
        .subscribe((res) => {
          console.log(res);
          this.currentChannel = res;
          this.channelPath = res.path ? res.path : [];
          this.getChannelsAndMedias(res);
        });
    } else {
      this.currentChannel =undefined;
      this.getRootChannelsAndMedias();
    }
  }

  getRootChannelsAndMedias(): void {
    this.msService.channelContent({}).subscribe((res) => {
      this.channelsAndMedias = res.channels;
      this.isLoading = false;
    });
  }

  getChannelsAndMedias(parent_channel: Channel): void {
    this.msService
      .channelContent({ parent_slug: parent_channel.slug } )
      .subscribe((res) => {
        let itemsList: Channel[] | Media[];
        this.channelsAndMedias = [];
        for (const itemType of this.itemTypes) {
          console.log(res);
          itemsList = []
          this.channelsAndMedias.push(...itemsList);
        }
        this.isLoading = false;
      });
  }
}
