import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as aesJs from 'aes-js';
import * as cryptoJs from 'crypto-js';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	toggleLeftSideNav: EventEmitter<any> = new EventEmitter();
	key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

	constructor(private http: HttpClient) {
		console.log(cryptoJs);
	}

	getNotes() {
		return this.http.get('assets/notesData.txt', { responseType: 'text' });
	}
	encrypt(data) {
		const stringData = (typeof (data) === 'object' ? JSON.stringify(data) : data);
		return this.hexFromBytes(this.modeOfOperation(this.key).encrypt(this.toBytes(stringData)));
	}
	decrypt(data) {
		const decryptString = this.fromBytes(this.modeOfOperation(this.key).decrypt(this.hexToBytes(data)));
		let decryptedData = false;
		try {
			decryptedData = JSON.parse(decryptString);
		} catch (e) {
			return false;
		}
		return decryptedData;
	}
	toBytes(data) {
		return aesJs.utils.utf8.toBytes(data);
	}
	fromBytes(data) {
		return aesJs.utils.utf8.fromBytes(data);
	}
	modeOfOperation(key) {
		return new aesJs.ModeOfOperation.ctr(key, new aesJs.Counter());
	}
	hexFromBytes(encrypt) {
		return aesJs.utils.hex.fromBytes(encrypt);
	}
	hexToBytes(decrypt) {
		return aesJs.utils.hex.toBytes(decrypt);
	}
}
