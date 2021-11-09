import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '@shared/models/channel';

@Component({
  selector: 'app-navigation-stepper',
  templateUrl: './navigation-stepper.component.html',
  styleUrls: ['./navigation-stepper.component.scss']
})
export class NavigationStepperComponent implements OnInit {
  @Input() channelPath?: Channel[];
  @Input() currentChannel?: Channel;


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
