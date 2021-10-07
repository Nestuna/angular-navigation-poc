import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AngularMediaserverService } from 'angular-mediaserver-service';
import { UbicastAngularCommonService, DialogService } from 'ubicast-angular-common';

export const loginSchema = {
  'type': 'object',
  'title': 'Please Login',
  'properties': {
    'password': {
      'title': 'Password',
      'type': 'password',
      'required': true
    },
    'rememberMe': {
      'title': 'Remember me!',
      'type': 'boolean'
    }
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'boilerplate-angular';
  response = '';

  loginSchema: any = loginSchema;
  loginForm: FormGroup = new FormGroup({});

  private subscriptions: Array<any> = [];

  ngOnDestroy (): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [];
  }

  constructor (
    public cs: UbicastAngularCommonService,
    private aMSService: AngularMediaserverService,
    private dialogService: DialogService
  ) {
    aMSService.ping().subscribe((response) => {
      this.response = JSON.stringify(response);
    });
  }
  openDialogs (confirm?: boolean) {
    let sub;
    if (confirm) {
      sub = this.dialogService.confirm(
        this.cs.translate('Modal title'),
        this.cs.translate('See a modal ?'),
        this.cs.translate('Confirm'),
        this.cs.translate('warn'),
        this.cs.translate('Nope')
      ).subscribe((result: boolean) => {
        console.log(result);
      });
    } else {
      sub = this.dialogService.schema(
        'Modal schema title',
        loginSchema, {}, '*'
      ).subscribe((result: boolean) => {
        console.log(result);
      });
    }
    this.subscriptions.push(sub);
  }
}
