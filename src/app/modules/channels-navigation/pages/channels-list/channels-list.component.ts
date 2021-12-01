import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Channel,
  Media,
  AngularMediaserverService,
  SearchOrder,
  commonAllMediasType,
} from 'angular-mediaserver-service';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-channels',
  templateUrl: './channels-list.component.html',
  styleUrls: ['./channels-list.component.scss'],
})
export class ChannelsListComponent implements OnInit {
  currentView: string = 'thumb';
  isLoading: boolean = false;

  parentChannel?: Channel;
  currentChannel?: Channel;
  channelPath: Channel[] = [];

  nb_items_per_page: number = 12;
  channelsAndMedias: Channel[] | Media[] = [];
  items?: commonAllMediasType;
  itemTypesKeys: Record<string, string> = {
    c: 'channels',
    v: 'videos',
    l: 'liveStreams',
    p: 'photoGroup'
  };
  itemsToShow: typeof this.channelsAndMedias = [];
  currentPage: number = 0;
  pagesTotal: number = 0;


  constructor(
    private msService: AngularMediaserverService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        this.channelsAndMedias = [];
        this.itemsToShow = [];
        this.currentPage = 0;
        this.pagesTotal = 0;

      }
      if (event instanceof NavigationEnd) {
        this.getChannelsAndMediasWithRouteParams();
      }
    });
  }


  ngOnInit(): void {
    this.isLoading = true;
  }

  getChannelsAndMediasWithRouteParams(): void {
    const { slug } = this.route.snapshot.params;
    const { sort } = this.route.snapshot.queryParams;

    this.getCurrentChannelContent(slug, sort);
  }

  getCurrentChannelContent(slug: string, sort: SearchOrder): void {
    if (slug) {
      this.msService.channel({ slug, full: true }).subscribe((res) => {
        this.currentChannel = res;
        this.channelPath = res.path ? res.path : [];
        this.getChannelsAndMedias(res, sort);
      });
    } else {
      this.getChannelsAndMedias();
      this.currentChannel = undefined
    }
  }

  getRootChannelsAndMedias(sort?: SearchOrder): void {
    this.msService.channelContent({ order_by: sort }).subscribe((res) => {
      this.channelsAndMedias = res.channels;
      this.items = res;
      this.isLoading = false;
      this.pagesTotal = Math.ceil(
        this.channelsAndMedias.length / this.nb_items_per_page
      );
      this.selectItemsToShow();
    });
  }

  getChannelsAndMedias(parentChannel?: Channel, sort?: SearchOrder): void {
    this.msService
      .channelContent({ parent_slug: parentChannel?.slug, order_by: sort })
      .subscribe((res) => {
        this.items = res;
        let itemsList: Channel[] | Media[] = [];
        for (const items of Object.values(res)) {
          itemsList.push(...items);
        }
        // we must re-assign data source to refresh mat-table
        this.channelsAndMedias = itemsList;
        this.isLoading = false;
        this.pagesTotal = Math.ceil(
          this.channelsAndMedias.length / this.nb_items_per_page
        );
        this.selectItemsToShow();
      });
  }

  selectItemsToShow(): void {
    const firstItemIndex: number = this.currentPage * this.nb_items_per_page;
    const lastItemIndex: number = firstItemIndex + this.nb_items_per_page;
    this.itemsToShow = this.channelsAndMedias.slice(
      firstItemIndex,
      lastItemIndex
    );
  }

  previousPage(): void {
    this.currentPage -= 1;
    this.selectItemsToShow();
  }

  nextPage(): void {
    this.currentPage += 1;
    this.selectItemsToShow();
  }
}
