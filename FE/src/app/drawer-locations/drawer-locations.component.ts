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

	addToTrack(): void {
		this.service.setBooleanShowAddEventForm(true);
		const point: Point = { x: 1, y: 1 };
		this.trackService.emitEvent(point);
		console.log('btn pressed');
	}
}

export interface Point {
	x: number;
	y: number;
}
export interface Path {
	points: Point[];
}
