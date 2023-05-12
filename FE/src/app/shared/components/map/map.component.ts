import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, NavigationControl } from 'maplibre-gl';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
	ngOnInit(): void {
  }

	map: Map | undefined;

	@ViewChild('map')
	private mapContainer!: ElementRef<HTMLElement>;

	ngAfterViewInit() {
		const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

		this.map = new Map({
			container: this.mapContainer.nativeElement,
			style: `https://api.maptiler.com/maps/streets-v2/style.json?key=97sou0kVjlk5MxdovBEU `,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});
    
    this.map?.addControl(new NavigationControl({}), 'top-right');
	}

	ngOnDestroy() {
		this.map?.remove();
	}
}
