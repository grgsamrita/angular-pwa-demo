import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-pwa-demo';

  updateChecked = false;
  updateAvailable = false;
  
  // In your template, use this value to show a loading indicator while we are
  // waiting for updates. (You can also use it to hide the rest of the UI if
  // you want to prevent the old version from being used.)
  get waitingForUpdates() {
    return !this.updateChecked || this.updateAvailable;
  }

  constructor(private updates: SwUpdate) {}

  async ngOnInit() {
    this.updates.available.subscribe(() => {
      console.log('new updates')
      // Keep the loading indicator active while we reload the page
      this.updateAvailable = true;
      window.location.reload();
    });
    if (this.updates.isEnabled) {
      // This promise will return when the update check is completed,
      // and if an update is available, it will also wait for the update
      // to be downloaded (at which point it calls our callback above and
      // we just need to reload the page to apply it).
      await this.updates.checkForUpdate();
    } else {
      console.log('Service worker updates are disabled.');
    }
    // The update check is done (or service workers are disabled), now
    // we can take the loading indicator down (unless we need to apply an
    // update, but in that case, we have already set this.updateAvailable
    // to true by this point, which keeps the loading indicator active).
    this.updateChecked = true;
  }
}
