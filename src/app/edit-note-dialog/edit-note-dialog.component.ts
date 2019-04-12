import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-edit-note-dialog',
	templateUrl: './edit-note-dialog.component.html',
	styleUrls: ['./edit-note-dialog.component.scss']
})
export class EditNoteDialogComponent implements OnInit {
	@ViewChild('editNoteTextarea') editNoteTextarea;
	constructor(private dialogRef: MatDialogRef<EditNoteDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data) { }

	ngOnInit() { }

	closeDialog(i) {
		if (this.editNoteTextarea && this.editNoteTextarea.nativeElement) {
			if (this.data && this.data.note) {
				this.data.note['newText'] = JSON.parse(JSON.stringify(this.editNoteTextarea.nativeElement.value));
			}
		}
		this.dialogRef.close(this.data);
	}

}
