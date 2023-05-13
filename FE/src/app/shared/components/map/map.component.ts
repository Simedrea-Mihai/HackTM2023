import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	AfterViewInit,
	OnDestroy,
	ComponentFactoryResolver,
	ViewContainerRef,
	inject
} from '@angular/core';
import { Map, NavigationControl, Marker, Popup } from 'maplibre-gl';
import { MapDetailsComponent } from '../map-details/map-details.component';
import * as turf from '@turf/turf';
import { DataService } from 'src/app/services/timisoara-points.servcie';
@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
	map: Map | undefined;

	dataService = inject(DataService);

	@ViewChild('map')
	private mapContainer!: ElementRef<HTMLElement>;

	constructor(private cfr: ComponentFactoryResolver, private vcr: ViewContainerRef) {}

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

					const dataPoints = this.dataService.getTimisoaraBorder();
					const polygon = turf.polygon([dataPoints]);
					const masked = turf.mask(polygon);

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

					const popup = new Popup({ offset: 25 }).setDOMContent(componentRef.location.nativeElement);

					componentRef.changeDetectorRef.detectChanges();

					this.map?.addControl(new NavigationControl({}), 'top-right');
					new Marker({ color: '#FF0000' }).setLngLat([longitude, latitude]).setPopup(popup).addTo(this.map);
				},
				(error) => {
					console.log(`Geolocation error: ${error}`);
				}
			);
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	}

	ngOnDestroy() {
		this.map?.remove();
	}
}
