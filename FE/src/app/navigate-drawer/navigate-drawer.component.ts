import { Component, OnInit, inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TrackService } from '../services/track.service';
import { Path } from '../drawer-locations/drawer-locations.component';
import { RenderService } from '../services/render.service';
import { BestRoute } from '../services/best-route.service';
import { ServerApi } from '../services/server.service';
@Component({
	selector: 'app-navigate-drawer',
	templateUrl: './navigate-drawer.component.html',
	styleUrls: ['./navigate-drawer.component.scss']
})
export class NavigateDrawerComponent implements OnInit {
	bestRoute = inject(BestRoute);
	constructor(private readonly service: RenderService, private readonly coolService: ServerApi) {}

	path: any = {
		points: []
	};

	showComponent = true;

	trackService = inject(TrackService);
	ngOnInit(): void {
		this.trackService.trackPopupState().subscribe((value) => {
			console.log(value);
			this.showComponent = value;
			this.path = this.trackService.getTrack();
			console.log(this.path);
		});
	}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.path.points, event.previousIndex, event.currentIndex);
		this.trackService.setTrack(this.path);
	}

	save() {
		this.coolService.setAllCoords(this.path);
		this.bestRoute.search(true);
	}

	close() {
		this.showComponent = false;
	}

	deletePoint(point: any) {
		this.trackService.removePoint(point);
		this.path = this.trackService.getTrack();
		console.log(this.path);
	}
}
