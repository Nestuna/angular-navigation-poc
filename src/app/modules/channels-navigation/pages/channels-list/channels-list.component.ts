import { Component,  OnInit } from '@angular/core';
import { Channel, Media, AngularMediaserverService, SearchOrder, commonAllMediasType } from 'angular-mediaserver-service';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  UrlTree,
  ActivatedRoute,
} from '@angular/router';

@Component({
  selector: 'app-channels',
  templateUrl: './channels-list.component.html',
  styleUrls: ['./channels-list.component.scss'],
})
export class ChannelsListComponent implements OnInit {
  currentView: string = 'thumb';
  parentChannel?: Channel;
  currentChannel?: Channel;
  channelPath: Channel[] = [];
  channelsAndMedias: Channel[] | Media[] = [];
  isLoading: boolean = false;

  constructor(
    private msService: AngularMediaserverService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        this.channelsAndMedias = [];
      }
      if (event instanceof NavigationEnd) {
        this.channelsAndMediasWithRouteParams();
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    if (this.channelsAndMedias.length === 0) this.getRootChannelsAndMedias();
  }

  channelsAndMediasWithRouteParams(): void {
    const { slug } = this.route.snapshot.params;
    const { sort } = this.route.snapshot.queryParams;
    console.log(this.route.snapshot);

    this.getCurrentChannelContent(slug, sort);
  }

  getCurrentChannelContent(slug: string, sort: SearchOrder): void {
    if (slug) {
      this.msService
        .channel({slug,  full: true})
        .subscribe((res) => {
          console.log(res);
          this.currentChannel = res;
          this.channelPath = res.path ? res.path : [];
          this.getChannelsAndMedias(res, sort);
        });
    } else {
      this.currentChannel = undefined;
      this.getRootChannelsAndMedias(sort);
    }
  }

  getRootChannelsAndMedias(sort?: SearchOrder): void {
    this.msService.channelContent({ order_by: sort }).subscribe((res) => {
      this.channelsAndMedias = res.channels;
      this.isLoading = false;
    });
  }

  getChannelsAndMedias(parent_channel: Channel, sort?: SearchOrder): void {
    this.msService
      .channelContent({ parent_slug: parent_channel.slug, order_by: sort } )
      .subscribe((res) => {
        let itemsList: Channel[] | Media[];
        for (const items of Object.values(res)) {
          this.channelsAndMedias.push(...items);
        }
        this.isLoading = false;
      });
  }
}
