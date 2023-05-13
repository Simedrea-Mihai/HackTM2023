import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
	selector: 'app-drawer-add-event',
	templateUrl: './drawer-add-event.component.html',
	styleUrls: ['./drawer-add-event.component.scss']
})
export class DrawerAddEventComponent implements OnInit {
	@Input() location = '';
	@Input() lat = '';
	@Input() long = '';
	eventForm = new FormGroup({
		name: new FormControl(''),
		description: new FormControl(''),
		startdate: new FormControl(),
		endate: new FormControl(),
		startime: new FormControl(),
		link: new FormControl('')
	});
	formData: any;

	constructor(private http: HttpClient) {}

	ngOnInit() {}

	onSubmit(): void {
		this.formData = this.eventForm.value;
		const [hour, minute] = this.formData.startime.split(':').map(Number);
		this.formData = {
			...this.formData,
			location: this.location,
			latitude: this.lat,
			longitude: this.long,
			type: 2,
			startime: hour < 12 ? hour + ':' + minute + 'AM' : hour - 12 + ':' + minute + 'PM'
		};
		console.log(this.formData);
		this.http.post('https://localhost:5000/addevents', this.formData).subscribe(
			(response) => {
				console.log(response);
				// Handle response from the server
			},
			(error) => {
				console.error(error);
				// Handle error from the server
			}
		);
	}
}
