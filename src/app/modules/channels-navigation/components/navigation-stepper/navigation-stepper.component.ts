import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'angular-mediaserver-service';

@Component({
  selector: 'app-navigation-stepper',
  templateUrl: './navigation-stepper.component.html',
  styleUrls: ['./navigation-stepper.component.scss']
})
export class NavigationStepperComponent {
  @Input() channelPath?: Channel[];
  @Input() currentChannel?: Channel;

  constructor(private route: ActivatedRoute) { }

}
