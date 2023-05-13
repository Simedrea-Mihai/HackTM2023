import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-drawer-filter',
	templateUrl: './drawer-filter.component.html',
	styleUrls: ['./drawer-filter.component.scss']
})
export class DrawerFilterComponent {
	filterForm = new FormGroup({
		official: new FormControl(''),
		unofficial: new FormControl(''),
		startdate: new FormControl(),
		endate: new FormControl()
	});
	formData: any;
}
