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
			if (window.innerWidth >= 601) {
				this.createColumn(4);
			}
			if (window.innerWidth <= 800 && window.innerWidth >= 600) {
				this.createColumn(2);
			}
			if (window.innerWidth <= 600) {
				this.createColumn(1);
			}
		}
	}
	constructor() { }

	ngOnInit() {
		this.createColumn(4);
	}
	createColumn(nos = 1) {
		this.columnsArray = [];
		for(let i = 0; i < nos; i++) {
			this.columnsArray.push({
				column: i,
				notes: []
			});
		}
		for (let nd = 0; nd < this.notesData.length; nd++) {
			if(nd == 0) {
				this.columnsArray[0]['notes'].push(this.notesData[nd]);
			} else {
				this.columnsArray[nd%nos]['notes'].push(this.notesData[nd]);
			}
		}
		console.log(this.columnsArray);
		// columnsArray.forEach((ele) => {
		// 	if (ele && ele['notes']  && ele['notes'].length > 0) {
		// 		this.alignNotes += '<div class="column">';
		// 		ele['notes'].forEach(eleNotes => {
		// 			if (eleNotes) {
		// 				this.alignNotes += '<div class="note"><div class="note-inner">';
		// 				this.alignNotes += '<pre>' + eleNotes.id;
		// 				this.alignNotes += eleNotes.text + '<pre>';
		// 				this.alignNotes += '</div></div>';
		// 			}
		// 		});
		// 		this.alignNotes += '</div>';
		// 	}
		// });
	}
}
