import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BestRoute {
	ob = new Subject<boolean>();

	search(value: boolean) {
		this.ob.next(value);
	}

	searchOb(): Observable<boolean> {
		return this.ob.asObservable();
	}
}
