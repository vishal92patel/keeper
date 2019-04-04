import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	constructor(
		private globalService: GlobalService
	) { }

	ngOnInit() {}
	leftSideNavToggle() {
		this.globalService.toggleLeftSideNav.emit();
	}

}
