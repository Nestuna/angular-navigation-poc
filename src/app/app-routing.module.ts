import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsListComponent } from '@modules/channels-navigation/pages';
import { LiveComponent } from '@modules/channels-navigation/pages/live/live.component';
import { VideoComponent } from '@modules/channels-navigation/pages/video/video.component';

const routes: Routes = [
  { path: '', redirectTo: '/channels', pathMatch: 'full' },
  { path: 'channels', component: ChannelsListComponent },
  { path: 'channels/:slug', component: ChannelsListComponent },
  { path: 'videos/:slug', component: VideoComponent },
  { path: 'lives/:slug', component: LiveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
