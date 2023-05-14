import { Injectable } from '@angular/core';
import { Path, Point } from '../drawer-locations/drawer-locations.component';

@Injectable({
	providedIn: 'root'
})
export class TrackService {
	track: Path = { points: [] };
	lastPoint: any = undefined;

	emitEvent(value: Point) {
		this.lastPoint = value;
	}

	addEvent() {
		this.track.points.push(this.lastPoint);
	}

	getTrack(): Path {
		const path: Path = { points: this.track.points };
		return path;
	}
}
