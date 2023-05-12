import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, NavigationControl } from 'maplibre-gl';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
	map: Map | undefined;

	@ViewChild('map')
	private mapContainer!: ElementRef<HTMLElement>;

	ngOnInit(): void {}

	ngAfterViewInit() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;

					const initialState = { lng: longitude, lat: latitude, zoom: 14 };

					this.map = new Map({
						container: this.mapContainer.nativeElement,
						style: `https://api.maptiler.com/maps/streets-v2/style.json?key=97sou0kVjlk5MxdovBEU `,
						center: [initialState.lng, initialState.lat],
						zoom: initialState.zoom
					});

					this.map?.addControl(new NavigationControl({}), 'top-right');
				},
				(error) => {
					console.log(`Geolocation error: ${error}`);
					// Handle error case
				}
			);
		} else {
			console.log('Geolocation is not supported by this browser.');
			// Handle unsupported case
		}
	}

	ngOnDestroy() {
		this.map?.remove();
	}
}
