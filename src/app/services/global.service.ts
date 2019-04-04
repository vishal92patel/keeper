import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	toggleLeftSideNav: EventEmitter<any> = new EventEmitter();
	constructor() {

	}
}
