import { Component, OnInit } from '@angular/core';
import {
  Channel,
  Media,
  AngularMediaserverService,
  SearchOrder,
} from 'angular-mediaserver-service';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';

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

  ITEMS_NB_PER_PAGE: number = 9;
  channelsAndMedias: Channel[] | Media[] = [];
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
        this.pagesTotal = 0;
      }
      if (event instanceof NavigationEnd) {
        this.channelsAndMediasWithRouteParams();
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
  }

  channelsAndMediasWithRouteParams(): void {
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
      this.getRootChannelsAndMedias(sort);
      this.currentChannel = undefined;
    }
  }

  getRootChannelsAndMedias(sort?: SearchOrder): void {
    this.msService.channelContent({ order_by: sort }).subscribe((res) => {
      this.channelsAndMedias = res.channels;
      this.isLoading = false;
      this.pagesTotal = Math.ceil(this.channelsAndMedias.length / this.ITEMS_NB_PER_PAGE)
      this.selectItemsToShow();
    });
  }

  getChannelsAndMedias(parent_channel: Channel, sort?: SearchOrder): void {
    this.msService
      .channelContent({ parent_slug: parent_channel.slug, order_by: sort })
      .subscribe((res) => {
        let itemsList: Channel[] | Media[] = [];
        for (const items of Object.values(res)) {
          itemsList.push(...items);
        }
        // we must re-assign data source to refresh mat-table
        this.channelsAndMedias = itemsList;
        this.isLoading = false;
        this.pagesTotal = Math.ceil(this.channelsAndMedias.length / this.ITEMS_NB_PER_PAGE)
        this.selectItemsToShow();
      });
  }

  selectItemsToShow(): void {
    const firstItemIndex: number = this.currentPage * this.ITEMS_NB_PER_PAGE;
    const lastItemIndex: number = firstItemIndex + (this.ITEMS_NB_PER_PAGE - 1);
    this.itemsToShow = this.channelsAndMedias.slice(
      firstItemIndex,
      lastItemIndex
    );
  }

  previousPage(): void {
    this.currentPage -= 1;
    this.selectItemsToShow()
  }

  nextPage(): void {
    this.currentPage += 1;
    this.selectItemsToShow()
    console.log(this.pagesTotal);
    console.log(this.currentPage);


  }
}
