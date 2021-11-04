import { Component, OnInit } from '@angular/core';
import { AngularMediaserverService } from 'angular-mediaserver-service';
import { Channel, SubChannel } from '@shared/models/channel';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  UrlTree,
  ActivatedRoute,
} from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-channels',
  templateUrl: './channels-list.component.html',
  styleUrls: ['./channels-list.component.scss'],
})
export class ChannelsListComponent implements OnInit {
  parentChannel?: Channel;
  currentChannel?: Channel;
  channelsList: SubChannel[] = [];
  isLoading: boolean = false;

  constructor(
    private msService: AngularMediaserverService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        console.log('Route change detected');
        this.channelsList = [];

      }
      if (event instanceof NavigationEnd) {
        const parsed_url = this.router.parseUrl(event.url);
        this.getChannelsListWithRouteParam(parsed_url);
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true
    if (this.channelsList.length === 0) this.getRootChannelsList();
  }

  getChannelsListWithRouteParam(parsed_url: UrlTree): void {
    const slug = parsed_url.queryParams.slug;
    this.setCurrentAndParentChannel(slug);
  }

  setCurrentAndParentChannel(slug: string): void {
    if (slug) {
      if (this.parentChannel) {
        if (slug === this.parentChannel.slug) {
          this.currentChannel = this.parentChannel;
          this.parentChannel = undefined;
          this.getSubChannelsList(this.currentChannel);
        }
      } else {
        this.msService.getChannel(undefined, slug).subscribe((res) => {
          this.parentChannel = this.currentChannel;
          this.currentChannel = res.info;
          this.getSubChannelsList(res.info);
        });
      }
    } else {
      this.currentChannel = this.parentChannel = undefined;
      this.getRootChannelsList();
    }
  }

  getRootChannelsList(): void {
    this.msService.getChannelContent().subscribe((res) => {
      this.channelsList = res.channels;
      this.isLoading = false;
    });
  }

  getSubChannelsList(parent_channel: Channel): void {
    this.msService
      .getChannelContent(undefined, parent_channel.slug)
      .subscribe((res) => {
        this.channelsList = res.channels;
        this.isLoading = false;
      });
  }
}
