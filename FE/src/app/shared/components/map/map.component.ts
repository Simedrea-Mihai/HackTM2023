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
import * as turf from '@turf/turf';
import { DataService } from 'src/app/services/timisoara-points.service';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { reverseGeocode } from '@esri/arcgis-rest-geocoding';
import { GeocodingControl } from '@maptiler/geocoding-control/maplibregl';
import { ServerApi } from 'src/app/services/server.service';
import { DrawerEvenimentComponent } from 'src/app/drawer-eveniment/drawer-eveniment.component';
import { RenderService } from 'src/app/services/render.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
	map: any;
	isMarkerClicked = false;

	dataService = inject(DataService);
	serverService = inject(ServerApi);

	@ViewChild('map')
	private mapContainer!: ElementRef<HTMLElement>;

	constructor(private cfr: ComponentFactoryResolver, private vcr: ViewContainerRef, private renderService: RenderService) {}

	ngOnInit(): void {}

	ngAfterViewInit() {
		const componentFactory = this.cfr.resolveComponentFactory(DrawerEvenimentComponent);
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

					componentRef.changeDetectorRef.detectChanges();

					const gc = new GeocodingControl({ apiKey: '97sou0kVjlk5MxdovBEU' });
					this.map.addControl(gc, 'top-right');

					this.map?.addControl(new NavigationControl({}), 'top-right');

					this.displayAllEvents();

					new Marker({ color: '#FF0000' }).setLngLat([longitude, latitude]).addTo(this.map);

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
		this.serverService.getAllEvents().subscribe((events) => {
			events.forEach((element: any) => {
				if (element.type === '1') {
					const marker = new maplibregl.Marker().setLngLat([element.longitude, element.latitude]).addTo(this.map);
					marker.getElement().addEventListener('click', () => {
						this.isMarkerClicked = true;
						this.renderService.setBoolean(this.isMarkerClicked);
					});
				} else if (element.type == 2) {
					new maplibregl.Marker().setLngLat([element.longitude, element.latitude]).addTo(this.map);
				} else if (element.type == 3) {
					new maplibregl.Marker().setLngLat([element.longitude, element.latitude]).addTo(this.map);
				}
			});
		});
	}
}
