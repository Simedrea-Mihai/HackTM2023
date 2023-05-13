import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	AfterViewInit,
	OnDestroy,
	ComponentFactoryResolver,
	ViewContainerRef
} from '@angular/core';
import { Map, NavigationControl, Marker, Popup } from 'maplibre-gl';
import { MapDetailsComponent } from '../map-details/map-details.component';
import * as turf from '@turf/turf';
@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
	map: Map | undefined;

	@ViewChild('map')
	private mapContainer!: ElementRef<HTMLElement>;

	constructor(private cfr: ComponentFactoryResolver, private vcr: ViewContainerRef) {}

	// ...

	ngOnInit(): void {}

	ngAfterViewInit() {
		const componentFactory = this.cfr.resolveComponentFactory(MapDetailsComponent);
		const componentRef = componentFactory.create(this.vcr.injector);

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

					const dataPoints = [
						[-67.13734351262877, 45.137451890638886],
						[-66.96466, 44.8097],
						[-68.03252, 44.3252],
						[-69.06, 43.98],
						[-70.11617, 43.68405],
						[-70.64573401557249, 43.090083319667144],
						[-70.75102474636725, 43.08003225358635],
						[-70.79761105007827, 43.21973948828747],
						[-70.98176001655037, 43.36789581966826],
						[-70.94416541205806, 43.46633942318431],
						[-71.08482, 45.3052400000002],
						[-70.6600225491012, 45.46022288673396],
						[-70.30495378282376, 45.914794623389355],
						[-70.00014034695016, 46.69317088478567],
						[-69.23708614772835, 47.44777598732787],
						[-68.90478084987546, 47.184794623394396],
						[-68.23430497910454, 47.35462921812177],
						[-67.79035274928509, 47.066248887716995],
						[-67.79141211614706, 45.702585354182816],
						[-67.13734351262877, 45.137451890638886]
					];

					var polygon = turf.polygon([dataPoints]);
					
					var masked = turf.mask(polygon);

					this.map.on('load', () => {
						this.map?.addSource('maine', {
							type: 'geojson',
							data: {
								type: 'Feature',
								geometry: {
									type: 'Polygon',
									coordinates: masked.geometry.coordinates
								}
							}
						});

						this.map?.addLayer({
							id: 'maine',
							type: 'fill',
							source: 'maine',
							layout: {},
							paint: {
								'fill-color': '#404040',
								'fill-opacity': 0.4
							}
						});
					});

					var popup = new Popup({ offset: 25 }).setDOMContent(componentRef.location.nativeElement);

					componentRef.changeDetectorRef.detectChanges();

					this.map?.addControl(new NavigationControl({}), 'top-right');
					new Marker({ color: '#FF0000' })
						.setLngLat([longitude, latitude])
						.setPopup(popup) // add popups
						.addTo(this.map);
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
