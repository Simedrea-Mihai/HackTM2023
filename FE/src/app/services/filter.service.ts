import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Filter } from '../Models/filter.model';
import { DatePipe } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class FilterService {
	datePipe: DatePipe = new DatePipe('en-US');
	currentDate = new Date();
	filter: any;

	sevenDaysFromCurrentTime = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 7);
	private eventSubject = new BehaviorSubject<Filter>({
		official: true,
		unofficial: true,
		startDate: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
		endDate: this.datePipe.transform(this.sevenDaysFromCurrentTime, 'yyyy-MM-dd')
	});

	emitEvent(eventName: Filter) {
		this.filter = eventName;
		this.eventSubject.next(eventName);
	}

	getEvent(): Observable<Filter> {
		return this.eventSubject.asObservable();
	}

	getFilter(): Filter {
		return this.filter;
	}
}
