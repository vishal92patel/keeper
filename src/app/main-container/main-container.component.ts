import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';
import { GlobalService } from '../services/global.service';
import { MatTooltip } from '@angular/material';

@Component({
    selector: 'app-main-container',
    templateUrl: './main-container.component.html',
    styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {
    notesData: any = [];
    columnsArray = [];
    columnCreated: number;
    dragNoteAndHoverOnRemoveBtn = false;
    @ViewChild('fabAddNewNoteTooltip') fabAddNewNoteTooltip: MatTooltip;
    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        if (window.innerWidth) {
            if (window.innerWidth >= 1921) {
                if (this.columnCreated !== 6) {
                    this.createColumn(6);
                }
            } else if (window.innerWidth >= 1281 && window.innerWidth <= 1920) {
                if (this.columnCreated !== 5) {
                    this.createColumn(5);
                }
            } else if (window.innerWidth >= 769 && window.innerWidth <= 1280) {
                if (this.columnCreated !== 4) {
                    this.createColumn(4);
                }
            } else if (window.innerWidth >= 601 && window.innerWidth <= 768) {
                if (this.columnCreated !== 3) {
                    this.createColumn(3);
                }
            } else if (window.innerWidth >= 301 && window.innerWidth <= 600) {
                if (this.columnCreated !== 2) {
                    this.createColumn(2);
                }
            } else if (window.innerWidth <= 300) {
                if (this.columnCreated !== 1) {
                    this.createColumn(1);
                }
            } else {
                if (this.columnCreated !== 2) {
                    this.createColumn();
                }
            }
        } else {
            if (this.columnCreated !== 2) {
                this.createColumn();
            }
        }
    }
    constructor(private matDialog: MatDialog, private globalService: GlobalService) { }

    ngOnInit() {
        this.globalService.getNotes().subscribe((data) => {
            this.notesData = this.globalService.decryptObject(data);
            if (this.notesData) {
                this.onResize();
            } else {

            }
        });
    }
    createColumn(nos = 2) {
        if (this.notesData) {
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
                newNotes.extras = { index: nd };
                if (nd === 0) {
                    this.columnsArray[0].notes.push(newNotes);
                } else {
                    this.columnsArray[nd % nos].notes.push(newNotes);
                }
            }
        } else {

        }
    }
    drop(event) {
        this.dragNoteAndHoverOnRemoveBtn = false;
        if (event) {
            const dragFromColumnIndex = parseInt((event.previousContainer.id).replace('column-id-', ''), 10);
            const dropInColumnIndex = parseInt((event.container.id).replace('column-id-', ''), 10);
            const elementDragFromColumnsArray = this.columnsArray[dragFromColumnIndex].notes[event.previousIndex];
            const elementDropOnFromColumnsArray = this.columnsArray[dropInColumnIndex].notes[event.currentIndex];
            const getOrignalNoteFromData = this.notesData[elementDragFromColumnsArray.extras.index];
            if (elementDragFromColumnsArray && elementDropOnFromColumnsArray) {
                this.notesData.splice(elementDragFromColumnsArray.extras.index, 1);
                this.notesData.splice(elementDropOnFromColumnsArray.extras.index, 0, getOrignalNoteFromData);
                this.createColumn(this.columnCreated);
            }
        } else {
            alert('Went something wrong');
        }
    }
    openDialog(i) {
        const dialogRef = this.matDialog.open(EditNoteDialogComponent, {
            minWidth: '100%',
            minHeight: '100%',
            disableClose: false,
            panelClass: 'edit-note-dialog',
            data: { id: i, note: JSON.parse(JSON.stringify(this.notesData[i])) }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.updateNote(result);
            }
        });
        dialogRef.componentInstance.updateNoteData.subscribe((result) => {
            if (result) {
                this.updateNote(result);
            }
        });
    }
    updateNote(result) {
        this.notesData[result.id].text = result.note.newText;
        this.createColumn(this.columnCreated);
        this.globalService.encryptObject(this.notesData);
    }
    onDropRemoveNote(e) {
        const fabAddNewNote = document.getElementById('fab-add-new-note');
        fabAddNewNote.classList.remove('hover');
        this.fabAddNewNoteTooltip.hide();
        this.dragNoteAndHoverOnRemoveBtn = false;
        if (e.item.element.nativeElement.dataset.index) {
            this.notesData.splice(e.item.element.nativeElement.dataset.index, 1);
            this.createColumn(this.columnCreated);
        }
    }
    cdkDragMoved(e) {
        this.dragNoteAndHoverOnRemoveBtn = true;
        const fabAddNewNote = document.getElementById('fab-add-new-note');
        const fabAddNewNoteStartY = fabAddNewNote.offsetTop;
        const fabAddNewNoteEndY = fabAddNewNote.offsetTop + 56;
        const fabAddNewNoteStartX = fabAddNewNote.offsetLeft;
        const fabAddNewNoteEndX = fabAddNewNote.offsetLeft + 56;
        const previewInnerNote: any = document.getElementsByClassName('cdk-drag-preview')[0].childNodes[1];
        const previewNoteHandler: any = document.getElementsByClassName('cdk-drag-preview')[0].childNodes[0];
        // tslint:disable-next-line:max-line-length
        if ((fabAddNewNoteStartX <= e.pointerPosition.x && fabAddNewNoteEndX >= e.pointerPosition.x) && (fabAddNewNoteStartY <= e.pointerPosition.y && fabAddNewNoteEndY >= e.pointerPosition.y)) {
            fabAddNewNote.classList.add('hover');
            previewInnerNote.style.display = 'none';
            this.fabAddNewNoteTooltip.show();
        } else {
            fabAddNewNote.classList.remove('hover');
            previewInnerNote.style.display = 'block';
            this.fabAddNewNoteTooltip.hide();
        }
    }
}
