import { Component, OnInit, Inject, ViewChild, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-edit-note-dialog',
	templateUrl: './edit-note-dialog.component.html',
	styleUrls: ['./edit-note-dialog.component.scss']
})
export class EditNoteDialogComponent implements OnInit {
	@ViewChild('editNoteTextarea') editNoteTextarea;
	updateNoteData = new EventEmitter();
	constructor(private dialogRef: MatDialogRef<EditNoteDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data) { }

	ngOnInit() { }

	closeDialog(i) {
		this.dialogRef.close(this.updateNote());
	}
	textareaKeyup(id) {
		this.updateNoteData.emit(this.updateNote());
	}
	updateNote() {
		if (this.editNoteTextarea && this.editNoteTextarea.nativeElement) {
			if (this.data && this.data.note) {
				this.data.note['newText'] = this.editNoteTextarea.nativeElement.value;
				return this.data;
			} else {
				return this.data;
			}
		} else {
			return this.data;
		}
	}
}
