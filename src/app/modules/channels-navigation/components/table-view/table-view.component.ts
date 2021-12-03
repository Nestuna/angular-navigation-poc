import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Channel, Media } from 'angular-mediaserver-service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() items!: Channel[] | Media[];

  itemsProps: string[] = ['type', 'title','speaker', 'add_date'];
  hostUrl = environment.apiUrl;
  urlsByType: Record<string, string> = {
    c: '/channels',
    v: '/videos',
    l: '/lives',
  };


  constructor(private router: Router) {
    this.items = [];
  }

  navigateTo(item: Channel | Media): void {
    if (!item || !item.type) {
      return
    }
    const url = this.urlsByType[item.type] + '/' + item.slug
    if (item.type == 'c') {
      // for channels it's a relative route
      this.router.navigate([url]);
    } else {
      // others are in beta.ubicast
      window.location.href = url
    }
  }
}
