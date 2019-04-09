import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';

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
		text: `6dmakd dmdkla <br> ddadada
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
	columnCreated;
	@ViewChild('test') test;
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		if (window.innerWidth) {
			if (window.innerWidth >= 1921) {
				if (this.columnCreated != 6) {
					this.createColumn(6);
				}
			} else if (window.innerWidth >= 1281 && window.innerWidth <= 1920) {
				if (this.columnCreated != 5) {
					this.createColumn(5);
				}
			} else if (window.innerWidth >= 769 && window.innerWidth <= 1280) {
				if (this.columnCreated != 4) {
					this.createColumn(4);
				}
			} else if (window.innerWidth >= 601 && window.innerWidth <= 768) {
				if (this.columnCreated != 3) {
					this.createColumn(3);
				}
			} else if (window.innerWidth >= 301 && window.innerWidth <= 600) {
				if (this.columnCreated != 2) {
					this.createColumn(2);
				}
			} else if (window.innerWidth <= 300) {
				if (this.columnCreated != 1) {
					this.createColumn(1);
				}
			} else {
				if (this.columnCreated != 2) {
					this.createColumn();
				}
			}
		} else {
			if (this.columnCreated != 2) {
				this.createColumn();
			}
		}
	}
	constructor(private matDialog: MatDialog) { }

	ngOnInit() {
		this.onResize();
	}
	createColumn(nos = 2) {
		this.columnCreated = nos;
		this.columnsArray = [];
		for (let i = 0; i < nos; i++) {
			this.columnsArray.push({
				column: i,
				notes: []
			});
		}
		for (let nd = 0; nd < this.notesData.length; nd++) {
			const newNotes = JSON.parse(JSON.stringify(this.notesData[nd]));
			newNotes['extras'] = { 'index': nd };
			if (nd == 0) {
				this.columnsArray[0]['notes'].push(newNotes);
			} else {
				this.columnsArray[nd % nos]['notes'].push(newNotes);
			}
		}
	}
	drop(event) {
		if (event) {
			const dragFromColumnIndex = parseInt((event.previousContainer.id).replace('column-id-', ''));
			const dropInColumnIndex = parseInt((event.container.id).replace('column-id-', ''));
			const elementDragFromColumnsArray = this.columnsArray[dragFromColumnIndex].notes[event.previousIndex];
			const elementDropOnFromColumnsArray = this.columnsArray[dropInColumnIndex].notes[event.currentIndex];
			const getOrignalNoteFromData = this.notesData[elementDragFromColumnsArray.extras.index];
			if (elementDragFromColumnsArray && elementDropOnFromColumnsArray) {
				this.notesData.splice(elementDragFromColumnsArray.extras.index, 1);
				this.notesData.splice(elementDropOnFromColumnsArray.extras.index, 0, getOrignalNoteFromData);
				this.createColumn(this.columnCreated);
			}
		} else {
			alert("Went something wrong");
		}
	}
	openDialog(i) {
		const dialogRef = this.matDialog.open(EditNoteDialogComponent, {
			width: '100%',
			maxWidth: '100%',
			height: '100%',
			maxHeight: '100%',
			disableClose: false,
			panelClass: 'edit-note-dialog',
			data: { id: i, note: this.notesData[i] }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
		});
	}
}
