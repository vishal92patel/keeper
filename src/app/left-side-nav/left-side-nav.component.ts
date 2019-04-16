import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
    selector: 'app-left-side-nav',
    templateUrl: './left-side-nav.component.html',
    styleUrls: ['./left-side-nav.component.scss']
})
export class LeftSideNavComponent implements OnInit {
    @ViewChild('leftSideNav') leftSideNav;

    constructor(
        private globalService: GlobalService
    ) { }

    ngOnInit() {
        this.globalService.toggleLeftSideNav.subscribe(() => {
            this.leftSideNav.opened = !this.leftSideNav.opened;
        });
    }

}
