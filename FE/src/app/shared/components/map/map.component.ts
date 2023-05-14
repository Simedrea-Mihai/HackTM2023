import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	AfterViewInit,
	OnDestroy,
	ComponentFactoryResolver,
	ViewContainerRef,
	inject,
	SimpleChange
} from '@angular/core';
import maplibregl, { Map, NavigationControl, Marker, Popup } from 'maplibre-gl';
import * as turf from '@turf/turf';
import { DataService } from 'src/app/services/timisoara-points.service';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { reverseGeocode } from '@esri/arcgis-rest-geocoding';
import { GeocodingControl } from '@maptiler/geocoding-control/maplibregl';
import { ServerApi } from 'src/app/services/server.service';
import { FilterService } from 'src/app/services/filter.service';
import { DrawerEvenimentComponent } from 'src/app/drawer-eveniment/drawer-eveniment.component';
import { RenderService } from 'src/app/services/render.service';
import { solveRoute } from '@esri/arcgis-rest-routing';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
	map: any;
	allMarkers: any[] = [];
	isMarkerClicked = false;

	dataService = inject(DataService);
	serverService = inject(ServerApi);
	filterService = inject(FilterService);
	walkingMan: any;

	markers: Marker[] = [];

	name: string = '';
	type: string = '';
	description: string = '';
	link: string = '';
	date: string = '';

	location: string = '';
	lat = '';
	lon = '';

	showAddEvent = false;
	showAddEventForm = false;
	newMarker: Marker | undefined;

	@ViewChild('map')
	private mapContainer!: ElementRef<HTMLElement>;

	constructor(private cfr: ComponentFactoryResolver, private vcr: ViewContainerRef, private renderService: RenderService) {}

	ngOnInit(): void {}

	ngDoCheck(): void {
		this.showAddEventForm = this.renderService.getBooleanShowAddEventForm();
		this.showAddEvent = this.renderService.getBooleanShowAddEvent();

		if (this.showAddEvent === false && this.newMarker !== undefined) {
			this.newMarker.remove();
		}

		if (this.walkingMan !== undefined) {
			console.log(this.walkingMan.getLngLat());
		}
	}

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
					let authentication: any;
					this.map.on('click', (e: any) => {
						const coords = e.lngLat;
						authentication = ApiKeyManager.fromKey(apiKey);
						
						if (this.renderService.getBoolean() === false) {
							this.showAddEvent = true;
							this.renderService.setBooleanShowAddEvent(true);
							console.log(e);

							if (this.newMarker !== undefined) {
								this.newMarker.remove();
							}

							// this.location = 
							this.newMarker = new Marker({ color: '#A020F0' }).setLngLat([coords.toArray()[0], coords.toArray()[1]]).addTo(this.map);
							this.lat = coords.toArray()[1].toString();
							this.lon = coords.toArray()[0].toString();
						}

						reverseGeocode([coords.toArray()[0], coords.toArray()[1]], {
							authentication
						}).then((result) => {
							this.location = result.address['Address'];
						});
					});

					componentRef.changeDetectorRef.detectChanges();

					const gc = new GeocodingControl({ apiKey: '97sou0kVjlk5MxdovBEU' });
					this.map.addControl(gc, 'top-right');

					var geolocate = new maplibregl.GeolocateControl({
						positionOptions: {
							enableHighAccuracy: true
						},
						trackUserLocation: true
					});

					const popup = new Popup().setHTML('<div>Hello!</div>');

					this.walkingMan = new Marker({ color: '#EFCC00' , draggable: true}).setLngLat([longitude, latitude]).setPopup(popup).addTo(this.map);
					this.walkingMan.togglePopup();
					// Add the control to the map.
					this.map.addControl(geolocate, 'bottom-left');
					// Set an event listener that fires
					// when a geolocate event occurs.
					geolocate.on('geolocate', function () {
						console.log('A geolocate event has occurred.');
					});
					this.addGeolocationBttton();

					
					// solveRoute({
					// 	stops: [startCoords, endCoords],
					// 	endpoint: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve",
					// 	authentication
					// }).then((response) => {
					// 	this.map.getSource("route").setData(response.routes.geoJson);

					this.map?.addControl(new NavigationControl({}), 'bottom-left');

					this.displayAllEvents();

					// new Marker({ color: '#FF0000' }).setLngLat([longitude, latitude]).addTo(this.map);

					this.addCurrentLocationOnMap();
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
		this.filterService.getEvent().subscribe((filter) => {
			if (this.markers.length > 0) {
				this.markers.forEach((marker: any) => {
					marker.remove();
				});
			}

			console.log(filter);
			if (filter.startDate) {
				this.serverService.getAllEvents(filter.startDate, filter.endDate).subscribe((events) => {
					events.forEach((element: any) => {
						if (element.type === '1' && filter.official == true) {
							const marker = new maplibregl.Marker({ color: '#fc0000' }).setLngLat([element.longitude, element.latitude]).addTo(this.map);
							this.markers.push(marker);
							this.allMarkers.push(element);
							marker.getElement().addEventListener('click', () => {
								const data = this.getClosestMarker(this.allMarkers, element);
								this.name = data.name;
								this.type = data.type;
								this.description = data.description;
								this.link = data.link;
								this.date = data.date;

								if (!this.showAddEvent) {
									this.isMarkerClicked = true;
									this.renderService.setBoolean(this.isMarkerClicked);
								}
							});
						} else if (element.type == 2 && filter.unofficial == true) {
							const marker = new maplibregl.Marker().setLngLat([element.longitude, element.latitude]).addTo(this.map);
							this.allMarkers.push(element);
							this.markers.push(marker);

							marker.getElement().addEventListener('click', () => {
								const data = this.getClosestMarker(this.allMarkers, element);
								this.name = data.name;
								this.type = data.type;
								this.description = data.description;
								this.link = data.link;
								this.date = data.date;

								if (!this.showAddEvent) {
									this.isMarkerClicked = true;
									this.renderService.setBoolean(this.isMarkerClicked);
								}
							});
						} else if (element.type == 3) {
							const marker = new maplibregl.Marker({ color: '#308efd' }).setLngLat([element.longitude, element.latitude]).addTo(this.map);
							this.markers.push(marker);
						}
					});
				});
			} else {
				this.serverService.getAllMonuments().subscribe((monuments) => {
					monuments.forEach((element: any) => {
						const marker = new maplibregl.Marker({color: '#808080', scale: 0.8}).setLngLat([element.longitude, element.latitude]).addTo(this.map);
							this.allMarkers.push(element);
							this.markers.push(marker);

							marker.getElement().addEventListener('click', () => {
								const data = this.getClosestMarker(this.allMarkers, element);
								this.name = data.name;
								this.type = data.type;
								this.description = data.description;
								this.link = data.link;
								this.date = data.date;

								if (!this.showAddEvent) {
									this.isMarkerClicked = true;
									this.renderService.setBoolean(this.isMarkerClicked);
								}
							});
				});
					});
					
			}
		});
	}

	addCurrentLocationOnMap(): void {}

	addGeolocationBttton(): void {
		var geolocate = new maplibregl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true
		});
		// Add the control to the map.
		// this.map.addControl(geolocate);
		// Set an event listener that fires
		// when a geolocate event occurs.
		geolocate.on('geolocate', function () {
			console.log('A geolocate event has occurred.');
		});
	}

	getClosestMarker(markers: any, pressed: any): any {
		const R = 6371e3;
		const distances = markers.map((marker: any) => {
			const lat1 = (pressed.latitude * Math.PI) / 180;
			const lat2 = (marker.latitude * Math.PI) / 180;
			const dLat = ((marker.latitude - pressed.latitude) * Math.PI) / 180;
			const dLon = ((marker.longitude - pressed.longitude) * Math.PI) / 180;
			const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			const d = R * c;
			return { ...marker, distance: d };
		});
		distances.sort((a: any, b: any) => a.distance - b.distance);
		return distances[0];
	}
}
