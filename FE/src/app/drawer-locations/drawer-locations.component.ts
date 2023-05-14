import { Component, Input, inject } from '@angular/core';
import { RenderService } from '../services/render.service';
import { TrackService } from '../services/track.service';

@Component({
	selector: 'app-drawer-locations',
	templateUrl: './drawer-locations.component.html',
	styleUrls: ['./drawer-locations.component.scss']
})
export class DrawerLocationsComponent {
	@Input() location = '';

	isComponentInView = false;

	trackService = inject(TrackService);

	constructor(private service: RenderService) {}

	close(): void {
		this.isComponentInView = false;
		this.service.setBooleanShowAddEvent(this.isComponentInView);
	}

	showAddEvent(): void {
		this.service.setBooleanShowAddEventForm(true);
	}

	addToTrack(): void {
		console.log('btn pressed addToTrack');
		this.trackService.addPoint();
		console.log('btn pressed addToTrack');
	}
}

export interface Point {
	x: number;
	y: number;
}
export interface Path {
	points: Point[];
}
