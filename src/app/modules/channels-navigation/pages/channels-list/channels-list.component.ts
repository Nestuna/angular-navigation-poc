import { Component, OnInit } from '@angular/core';
import {
  AngularMediaserverService,
  MediaserverConfig,
} from 'angular-mediaserver-service';
import { CommonUtils as utils } from '@shared/utils/common'
import { ChannelData } from '@shared/models/channel';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-channels',
  templateUrl: './channels-list.component.html',
  styleUrls: ['./channels-list.component.scss'],
})
export class ChannelsListComponent implements OnInit {
  rootChannelsList?: any[]
  channelsList: ChannelData[] = []

  constructor(private msService: AngularMediaserverService) {}

  ngOnInit(): void {
    utils.checkConnection(this.msService)
    this.getAllParentChannels()
  }

  getAllParentChannels(): void {
    this.msService.getChannelsList().subscribe(res => {
      for (const channel of res.channels) {
        this.getChannelData(channel.oid)
      }
    })
  }

  getChannelData(oid: string): void{
    this.msService.getChannel(oid)
      .subscribe(res => {this.channelsList.push(res.info)})
  }
}
