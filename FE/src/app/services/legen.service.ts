import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ShowLegendService {
	showLegend: boolean = false;

	private eventSubject = new BehaviorSubject<boolean>(true);

	emitEvent(value: boolean) {
		this.eventSubject.next(value);
	}

	getEvent(): Observable<boolean> {
		return this.eventSubject.asObservable();
	}
}
