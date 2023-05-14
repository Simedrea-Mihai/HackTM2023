import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RenderService } from '../services/render.service';
import { FilterService } from '../services/filter.service';
@Component({
	selector: 'app-drawer-add-event',
	templateUrl: './drawer-add-event.component.html',
	styleUrls: ['./drawer-add-event.component.scss']
})
export class DrawerAddEventComponent implements OnInit {
	@Input() location = '';
	@Input() lat = '';
	@Input() long = '';

	filterService = inject(FilterService);

	eventForm = new FormGroup({
		name: new FormControl(''),
		description: new FormControl(''),
		startdate: new FormControl(),
		endate: new FormControl(),
		startime: new FormControl(),
		link: new FormControl('')
	});
	formData: any;
	isComponentInView = false;

	constructor(private http: HttpClient, private readonly service: RenderService) {}

	ngOnInit() {}

	close(): void {
		this.isComponentInView = false;
		this.service.setBooleanShowAddEventForm(this.isComponentInView);
	}

	onSubmit(): void {
		this.formData = this.eventForm.value;
		const [hour, minute] = this.formData.startime.split(':').map(Number);
		this.formData = {
			...this.formData,
			location: this.location,
			longitude: this.long,
			latitude: this.lat,
			type: 2,
			startime: hour < 12 ? hour + ':' + minute + 'AM' : hour - 12 + ':' + minute + 'PM'
		};
		console.log(this.formData);
		this.http.post('http://localhost:5000/addevent', this.formData).subscribe(
			(response) => {
				console.log(response);
				// Handle response from the server
				const filter = this.filterService.getFilter();
				console.log('3333333333333333333333333333333333333333333');
				console.log(filter);
				this.filterService.emitEvent(filter);
			},
			(error) => {
				console.error(error);
				// Handle error from the server
			},
			() => {
				this.service.setBoolean(false);
				this.service.setBooleanShowAddEventForm(false);
			}
		);
	}
}
