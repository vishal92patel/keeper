import { Component } from '@angular/core';
import * as $ from 'jquery';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'keeper';
    constructor() {
        if (environment.production) {
            // START This is to remove 000webhost.com branding ads
            $(document).ready(() => {
                const scripts = $('body').prevObject[0].scripts;
                const divs = $('div');
                scripts[scripts.length - 1].remove();
                divs[divs.length - 1].remove();
                console.log('👏👏 Congrats! Branding Ads Removed 👏👏');
            });
            // END This is to remove 000webhost.com branding ads
        }
    }
}
