import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ServerApi {
	constructor(private http: HttpClient) {}

	private pointsData = [];

	getAllEvents(startDate: any, endate: any): Observable<any> {
		const url = 'http://localhost:5000/allevents';
		const body = { start: startDate, end: endate };
		return this.http.post(url, body);
	}

	getAllMonuments(): Observable<any> {
		const url = 'http://localhost:5000/allhistoric';
		return this.http.get(url);
	}

	getAllCoords(): any {
		return this.pointsData;
	}

	setAllCoords(data: any): void {
		this.pointsData = data;
	}
}
