import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'app-main-container',
	templateUrl: './main-container.component.html',
	styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {
	notesData = [{
		id: '1',
		text: 'dmakd dmdkla <br> ddadada'
	}, {
		id: '2',
		text: 'dasd d332 rr <>br <br> ffw ff <br> dfsf'
	}, {
		id: '3',
		text: ''
	}, {
		id: '4',
		text: ''
	}, {
		id: '5',
		text: ''
	}, {
		id: '6',
		text: `dmakd dmdkla <br> ddadada
		dfdfdsf  fdsf
		<b>dsfsdfsd</b>
		dsf
		s
		fds
		`
	}, {
		id: '7',
		text: ''
	}, {
		id: '8',
		text: ''
	}, {
		id: '9',
		text: ''
	}, {
		id: '10',
		text: ''
	}];
	columnsArray = [];
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		if (window.innerWidth) {
			if (window.innerWidth >= 1301) {
				this.createColumn(6);
			} else if (window.innerWidth >= 1281 && window.innerWidth <= 1300) {
				this.createColumn(5);
			} else if (window.innerWidth >= 769 && window.innerWidth <= 1280) {
				this.createColumn(4);
			} else if (window.innerWidth >= 601 && window.innerWidth <= 768) {
				this.createColumn(3);
			} else if (window.innerWidth >= 301 && window.innerWidth <= 600) {
				this.createColumn(2);
			} else if (window.innerWidth <= 300) {
				this.createColumn(1);
			} else {
				this.createColumn();
			}
		} else {
			this.createColumn();
		}
	}
	constructor() { }

	ngOnInit() {
		this.onResize();
	}
	createColumn(nos = 2) {
		this.columnsArray = [];
		for (let i = 0; i < nos; i++) {
			this.columnsArray.push({
				column: i,
				notes: []
			});
		}
		for (let nd = 0; nd < this.notesData.length; nd++) {
			if (nd == 0) {
				this.columnsArray[0]['notes'].push(this.notesData[nd]);
			} else {
				this.columnsArray[nd % nos]['notes'].push(this.notesData[nd]);
			}
		}
	}
}