import { Component, inject } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { Filter } from '../Models/filter.model';
import { DatePipe } from '@angular/common';
import { ShowLegendService } from '../services/legen.service';
import { TrackService } from '../services/track.service';

@Component({
	selector: 'app-bottom-nav',
	templateUrl: './bottom-nav.component.html',
	styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {
	datePipe: DatePipe = new DatePipe('en-US');
	currentDate = new Date();

	filterService = inject(FilterService);
	showLegendService = inject(ShowLegendService);
	trackService = inject(TrackService);

	resetFilter(): void {
		const filter: Filter = { official: false, unofficial: false, startDate: null, endDate: null };
		this.filterService.emitEvent(filter);
		this.showLegendService.emitEvent(false);
	}

	initFilter(): void {
		console.log('initFilter');
		const filter: Filter = {
			official: true,
			unofficial: true,
			startDate: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
			endDate: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd')
		};
		console.log(filter);
		this.filterService.emitEvent(filter);

		this.showLegendService.emitEvent(true);
	}
	btnNumber: number = 2;
	setBtn(n: number) {
		console.log(n);
		this.btnNumber = n;

		if (n == 1) {
			this.resetFilter();
			this.trackService.addTrackPopup(false);
		} else if (n == 2) {
			this.initFilter();
			this.trackService.addTrackPopup(false);
		} else if (n == 3) {
			this.resetFilter();
			this.trackService.addTrackPopup(true);
		}
	}
}
