import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BestRoute {
	ob = new BehaviorSubject<boolean>(false);
	delete = new BehaviorSubject<boolean>(false);

	search(value: boolean) {
		console.log('emit value for show route');
		console.log(value);
		this.ob.next(value);
	}

	searchOb(): Observable<boolean> {
		return this.ob.asObservable();
	}

	deleteEmit() {
		console.log('emit value for delete route');
		this.delete.next(true);
	}

	deleteOb() {
		return this.delete.asObservable();
	}
}
