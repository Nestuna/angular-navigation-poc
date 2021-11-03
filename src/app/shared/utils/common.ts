import { AngularMediaserverService } from 'angular-mediaserver-service';


export class CommonUtils {
    static checkConnection(msService: AngularMediaserverService): void {
        msService.ping().subscribe((res) => {
          if (!res.success) {
            console.error('Failed to reach MediaServer API.')
          } else {
            console.log('Connected to MediaServer API.')
          }
        });
      }
}
