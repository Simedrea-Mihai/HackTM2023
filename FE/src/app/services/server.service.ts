import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ServerApi {
	constructor(private http: HttpClient) {}

	getAllEvents(type: number, date: Date): Observable<any> {
		const url = 'http://localhost:5000/allevents';

		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		const body = { type: type, date: date };

		return this.http.get(url);
	}
}
