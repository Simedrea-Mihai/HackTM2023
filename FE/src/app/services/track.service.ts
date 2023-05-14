import { Injectable } from '@angular/core';
import { Path, Point } from '../drawer-locations/drawer-locations.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TrackService {
	trackPopup = new BehaviorSubject<boolean>(false);

	track: Path = { points: [] };
	lastPoint: any = undefined;

	setLastPoint(value: any) {
		this.lastPoint = value;
	}

	addPoint() {
		console.log('add last point');
		if (this.track.points.includes(this.lastPoint)) {
			return;
		}
		console.log(this.lastPoint);
		this.track.points.push(this.lastPoint);
	}

	removePoint(point: any) {
		console.log('remove point');
		console.log(this.track);
		if (this.track.points.includes(point)) {
			const index = this.track.points.indexOf(point);
			if (index !== -1) {
				this.track.points.splice(index, 1);
			}
		}
		console.log(this.track);
	}

	getTrack(): Path {
		console.log(this.track);
		const path: Path = { points: this.track.points };
		return path;
	}

	addTrackPopup(value: boolean) {
		this.trackPopup.next(value);
	}

	trackPopupState(): Observable<boolean> {
		return this.trackPopup.asObservable();
	}

	setTrack(track: any) {
		this.track = track;
	}
}
