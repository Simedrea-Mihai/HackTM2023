import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
	selector: 'app-navigate-drawer',
	templateUrl: './navigate-drawer.component.html',
	styleUrls: ['./navigate-drawer.component.scss']
})
export class NavigateDrawerComponent {
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
}
