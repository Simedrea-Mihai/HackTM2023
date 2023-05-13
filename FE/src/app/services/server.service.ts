import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ServerApi {
	constructor(private http: HttpClient) {}

	getAllEvents(startDate: any, endate: any): Observable<any> {
		const url = 'http://localhost:5000/allevents';
		const body = { start: startDate, end: endate };
		return this.http.post(url, body);
	}
}
