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
import maplibregl, { Map, NavigationControl, Marker, Popup } from 'maplibre-gl';
import { MapDetailsComponent } from '../map-details/map-details.component';
import * as turf from '@turf/turf';
import { DataService } from 'src/app/services/timisoara-points.service';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { reverseGeocode } from '@esri/arcgis-rest-geocoding';
import { GeocodingControl } from '@maptiler/geocoding-control/maplibregl';
import { ServerApi } from 'src/app/services/server.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
	map: any;

	dataService = inject(DataService);
	serverService = inject(ServerApi);

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

					const apiKey = 'AAPK926be3ee4d3143558107dbb85005e965dbdzAz2rYG1TGmnqf2sbgs_fBRNex_dVn5zzuispPgW1H-_oI6agdri40LpV506V';
					this.map.on('click', (e: any) => {
						const coords = e.lngLat;
						console.log(coords.toArray());

						const authentication = ApiKeyManager.fromKey(apiKey);

						reverseGeocode([coords.toArray()[0], coords.toArray()[1]], {
							authentication
						}).then((result) => {
							console.log(result);
						});
					});

					const popup = new Popup({ offset: 25 }).setDOMContent(componentRef.location.nativeElement);

					this.displayAllEvents();

					componentRef.changeDetectorRef.detectChanges();

					const gc = new GeocodingControl({ apiKey: '97sou0kVjlk5MxdovBEU' });
					this.map.addControl(gc, 'top-right');

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

	displayAllEvents(): void {
		const today: Date = new Date();
		const year: number = today.getFullYear();
		const month: number = today.getMonth();
		const day: number = today.getDate();
		const date = new Date(year, month, day);
		this.serverService.getAllEvents(date).subscribe((events) => {
			console.log(events);
			events.forEach((element: any) => {
				console.log(element.type);
				console.log(element.latitude);
				console.log(element.longitude);
				if (element.type === '1') {
					console.log('intra aici');
					new maplibregl.Marker().setLngLat([element.longitude, element.latitude]).addTo(this.map);
				} else if (element.type == 2) {
					new maplibregl.Marker().setLngLat([element.longitude, element.latitude]).addTo(this.map);
				} else if (element.type == 3) {
					new maplibregl.Marker().setLngLat([element.longitude, element.latitude]).addTo(this.map);
				}
				console.log(element.name);
			});
		});
	}
}
