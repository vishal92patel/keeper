import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-edit-note-dialog',
	templateUrl: './edit-note-dialog.component.html',
	styleUrls: ['./edit-note-dialog.component.scss']
})
export class EditNoteDialogComponent implements OnInit {

	constructor(private dialogRef: MatDialogRef<EditNoteDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data) { }

	ngOnInit() { }

	closeDialog(i) {
		this.dialogRef.close();
	}

}
