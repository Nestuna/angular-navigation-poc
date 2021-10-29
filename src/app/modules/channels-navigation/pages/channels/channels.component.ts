import { Component, OnInit } from '@angular/core';
import {
  AngularMediaserverService,
  MediaserverConfig,
} from 'angular-mediaserver-service';
import { Observable } from 'rxjs';
import { CommonUtils as utils } from '@shared/utils/common'


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit {
  channelsList?: any[];

  constructor(private msService: AngularMediaserverService) {}

  ngOnInit(): void {
    utils.checkConnection(this.msService)
    this.getAllChannels()
  }

  getAllChannels(): void {
    this.msService.getChannelsList().subscribe((res) => {
      this.channelsList = res.channels;
    })
  }

  checkConnection(): void{
    this.msService.ping().subscribe((res) => {
      if (!res.success) {
        console.error('Failed to reach MediaServer API.')
      } else {
        console.log('Connected to MediaServer API.')
      }
    });
  }
}
