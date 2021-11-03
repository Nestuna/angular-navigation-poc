import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsListComponent } from './pages';
import { MaterialModule } from 'src/app/material.module';
import { ChannelItemComponent } from './components/channel-item/channel-item.component';
@NgModule({
  declarations: [
    ChannelsListComponent,
    ChannelItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ChannelsListComponent
  ]
})
export class ChannelsNavigationModule { }
