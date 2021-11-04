import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsListComponent } from './pages';
import { MaterialModule } from 'src/app/shared/material.module';
import { ChannelItemComponent } from './components/channel-item/channel-item.component';
import { RouterModule } from '@angular/router';
import { NavigationStepperComponent } from './components/navigation-stepper/navigation-stepper.component';
@NgModule({
  declarations: [
    ChannelsListComponent,
    ChannelItemComponent,
    NavigationStepperComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    ChannelsListComponent
  ]
})
export class ChannelsNavigationModule { }
