import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ServerApi {
	constructor(private http: HttpClient) {}

	// getEvents(type: number, date: Date): Observable<any> {
	// 	const url = 'http://localhost:5000/allevents';

	// 	const headers = new HttpHeaders().set('Content-Type', 'application/json');
	// 	const body = { type: type, date: date };

	// 	return this.http.get(url);
	// }

	getAllEvents(date: any): Observable<any> {
		const url = 'http://localhost:5000/eventbydate';

		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		const body = { date: date };

		return this.http.post(url, body);
	}
}
