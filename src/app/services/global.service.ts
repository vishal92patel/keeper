import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	toggleLeftSideNav: EventEmitter<any> = new EventEmitter();
	constructor(private http: HttpClient) { }

	getNotes() {
		return this.http.get('assets/notesData.json');
	}
}
