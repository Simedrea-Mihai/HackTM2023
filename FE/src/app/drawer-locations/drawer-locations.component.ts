import { Component, Input } from '@angular/core';
import { RenderService } from '../services/render.service';

@Component({
	selector: 'app-drawer-locations',
	templateUrl: './drawer-locations.component.html',
	styleUrls: ['./drawer-locations.component.scss']
})
export class DrawerLocationsComponent {
	isComponentInView = false;


	constructor(private service: RenderService) {

	}
	
	@Input() location = '';

	close(): void {
		this.isComponentInView = false;
		this.service.setBooleanShowAddEvent(this.isComponentInView);
	}

	showEventForm(): void {
		this.service.setBooleanShowAddEventForm(true);
	}
}
