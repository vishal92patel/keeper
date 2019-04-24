import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as aesJs from 'aes-js';
import * as cryptoJs from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    toggleLeftSideNav: EventEmitter<any> = new EventEmitter();
    private secret: string = null;
    constructor(private http: HttpClient) {
        try {
            this.secret = cryptoJs.MD5('password').toString();
        } catch (e) {
            this.secret = null;
        }
    }

    getNotes() {
        return this.http.get('assets/notesData.txt', { responseType: 'text' });
    }
    encryptObject(data) {
        if (typeof (data) === 'object') {
            try {
                return cryptoJs.AES.encrypt(JSON.stringify(data), this.secret).toString();
            } catch (e) {
                return false;
            }
        } else {
            return false;
        }
    }
    decryptObject(data) {
        try {
            return JSON.parse(cryptoJs.AES.decrypt(data, this.secret).toString(cryptoJs.enc.Utf8));
        } catch (e) {
            return false;
        }
    }





    // key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    // encrypt(data) {
    // 	const stringData = (typeof (data) === 'object' ? JSON.stringify(data) : data);
    // 	return this.hexFromBytes(this.modeOfOperation(this.key).encrypt(this.toBytes(stringData)));
    // }
    // decrypt(data) {
    // 	const decryptString = this.fromBytes(this.modeOfOperation(this.key).decrypt(this.hexToBytes(data)));
    // 	let decryptedData = false;
    // 	try {
    // 		decryptedData = JSON.parse(decryptString);
    // 	} catch (e) {
    // 		return false;
    // 	}
    // 	return decryptedData;
    // }
    // toBytes(data) {
    // 	return aesJs.utils.utf8.toBytes(data);
    // }
    // fromBytes(data) {
    // 	return aesJs.utils.utf8.fromBytes(data);
    // }
    // modeOfOperation(key) {
    // 	return new aesJs.ModeOfOperation.ctr(key, new aesJs.Counter());
    // }
    // hexFromBytes(encrypt) {
    // 	return aesJs.utils.hex.fromBytes(encrypt);
    // }
    // hexToBytes(decrypt) {
    // 	return aesJs.utils.hex.toBytes(decrypt);
    // }
    // addSalt(data, salt) {
    // 	return cryptoJs.PBKDF2(data, salt, { keySize: 256, iterations: 1000 }).toString();
    // }
}
