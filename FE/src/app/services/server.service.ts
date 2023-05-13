import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ServerApi {
	constructor(private http: HttpClient) {}

	getEvents(type: number, date: Date): Observable<any> {
		const url = 'http://localhost:5000/eventype';
		const body = { type: type, date: date };
		return this.http.post(url, body);
	}
}
