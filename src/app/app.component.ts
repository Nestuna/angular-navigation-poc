import { Component } from '@angular/core';
import { AngularMediaserverServiceService } from 'angular-mediaserver-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boilerplate-angular';
  response = '';

  constructor(private aMSService: AngularMediaserverServiceService) {
    aMSService.ping().subscribe((response) => {
      this.response = JSON.stringify(response);
    });
  }
}
