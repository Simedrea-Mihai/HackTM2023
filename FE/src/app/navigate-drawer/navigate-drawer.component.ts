import { Component, OnInit, inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TrackService } from '../services/track.service';
import { Path } from '../drawer-locations/drawer-locations.component';
import { RenderService } from '../services/render.service';
@Component({
	selector: 'app-navigate-drawer',
	templateUrl: './navigate-drawer.component.html',
	styleUrls: ['./navigate-drawer.component.scss']
})
export class NavigateDrawerComponent implements OnInit {
	constructor(private readonly service: RenderService) {

	}

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

	movies = [
		{
			name: 'Episode I - The Phantom Menace'
		},
		{
			name: 'Episode II - Attack of the Clones'
		},
		{
			name: 'Episode III - Revenge of the Sith'
		},
		{
			name: 'Episode IV - A New Hope'
		},
		{
			name: 'Episode V - The Empire Strikes Back'
		},
		{
			name: 'Episode VI - Return of the Jedi'
		},
		{
			name: 'Episode VI - Return of the Jedi'
		}
	];

	delete(index: any) {
		this.movies.splice(index, 1);
	}

	addNew() {
		this.movies.push({
			name: 'new item'
		});
	}
	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
	}
	save() {
		console.log(this.movies);
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
