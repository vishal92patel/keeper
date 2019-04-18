import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'keeper';
    constructor() {
        $(document).ready(() => {
            console.log($('body'));
            console.log($('div:last-child').remove());
            const scripts = $('body').prevObject[0].scripts;
            console.log(scripts[scripts.length - 1].remove());
        });
    }
}
