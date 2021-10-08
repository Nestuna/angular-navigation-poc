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
  dialogChoices = [
  'confirm',
  'schema',
  'message',
  'video',
  'multipleChoices',
  'choices'
  ];
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
  openDialogs (type?: string) {
    let sub;
    switch (type) {
      case 'confirm':
        sub = this.dialogService.confirm(
          this.cs.translate('Modal title'),
          this.cs.translate('See a modal ?'),
          this.cs.translate('Confirm'),
          this.cs.translate('warn'),
          this.cs.translate('Nope')
        ).subscribe((result: boolean) => {
          console.log(result);
        });
        break;
      case 'schema':
        sub = this.dialogService.schema(
          'Modal schema title',
          loginSchema, {}, '*'
        ).subscribe((result: boolean) => {
          console.log(result);
        });
        break;
      case 'message':
        sub = this.dialogService.message(
          'Modal message title',
          'text to display'
        ).subscribe((result: boolean) => {
          console.log(result);
        });
        break;
      case 'video':
        sub = this.dialogService.video(
          'https://1884242627.rsc.cdn77.org/ubicasttv/r125f75d561385c4bu7lbk9ibn281j/audio_491_lbvdwha79y_clean.mp3'
        ).subscribe((result: boolean) => {
          console.log(result);
        });
        break;
      case 'multipleChoices':
        sub = this.dialogService.multipleChoices(
          [
            {'label': 'test 1', 'name': 'test1'},
            {'label': 'test 2', 'name': 'test2'}
          ],
          'Modal multipleChoices title'
        ).subscribe((result: Array<string>) => {
          console.log(result);
        });
        break;
      case 'choices':
        sub = this.dialogService.choices(
          [
            {'label': 'test 1', 'name': 'test1'},
            {'label': 'test 2', 'name': 'test2'}
          ],
          'Modal choices title'
        ).subscribe((result: string) => {
          console.log(result);
        });
        break;
    }
    this.subscriptions.push(sub);
  }
  login () {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value['password']);
      console.log(this.loginForm.value['rememberMe']);
    }
  }
}
