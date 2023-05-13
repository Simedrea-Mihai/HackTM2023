import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ServerApi {
	constructor(private http: HttpClient) {}

	getAllEvents(date: any): Observable<any> {
		const url = 'http://localhost:5000/eventbydate';
		const body = { date: date };
		return this.http.post(url, body);
	}
}
