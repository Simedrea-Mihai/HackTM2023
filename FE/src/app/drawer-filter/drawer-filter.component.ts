import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterService } from '../services/filter.service';
import { Filter } from '../Models/filter.model';
import { RenderService } from '../services/render.service';

@Component({
	selector: 'app-drawer-filter',
	templateUrl: './drawer-filter.component.html',
	styleUrls: ['./drawer-filter.component.scss']
})
export class DrawerFilterComponent implements OnInit {
	@ViewChild('starDate') starDateRef!: ElementRef;
	currentDate = new Date();
	sevenDaysFromCurrentTime = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() + 7);
	filterForm: FormGroup;

	official = new FormControl(true);
	unofficial = new FormControl(true);
	startDate = new FormControl(new Date().toISOString().split('T')[0]);
	endDate = new FormControl();

	filterService = inject(FilterService);

	constructor(private readonly service: RenderService) {
		this.filterForm = new FormGroup({
			official: this.official,
			unofficial: this.unofficial,
			startDate: this.startDate,
			endDate: this.endDate
		});
	}

	ngOnInit(): void {
		this.filterForm.valueChanges.subscribe((value) => {
			this.onSubmit();
		});
	}

	close(): void {
		this.service.setBooleanShowFilter(false);
	}

	onSubmit(): void {
		const isOfficial = this.filterForm.value.official;
		const isUnofficial = this.filterForm.value.unofficial;
		const startDate = this.filterForm.value.startDate;
		const endDate = this.filterForm.value.endDate;

		console.log(isOfficial, isUnofficial, startDate, endDate);
		const filter: Filter = { official: isOfficial, unofficial: isUnofficial, startDate, endDate };
		this.filterService.emitEvent(filter);
	}
}
