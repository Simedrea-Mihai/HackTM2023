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
						[21.23662047, 45.78857909],
						[21.25789193, 45.79235457],
						[21.27955015, 45.78803971],
						[21.2899925, 45.79397256],
						[21.29540705, 45.78102735],
						[21.28419119, 45.77671161],
						[21.27529585, 45.76834892],
						[21.28921899, 45.75998498],
						[21.29734082, 45.74190379],
						[21.29308653, 45.73407578],
						[21.29037925, 45.72435673],
						[21.27645611, 45.73029635],
						[21.27684287, 45.72057664],
						[21.28148391, 45.7124756],
						[21.27374884, 45.69708037],
						[21.26137271, 45.70518365],
						[21.25131711, 45.71328575],
						[21.22733838, 45.71544612],
						[21.2095477, 45.71436595],
						[21.19678482, 45.70518365],
						[21.17280608, 45.68357229],
						[21.16004321, 45.6827617],
						[21.16391075, 45.69167753],
						[21.1743531, 45.69654011],
						[21.18904975, 45.70842463],
						[21.20490665, 45.72408673],
						[21.19639807, 45.73056632],
						[21.17628687, 45.73056632],
						[21.16545776, 45.72705664],
						[21.16236373, 45.73137622],
						[21.15192138, 45.73029635],
						[21.1391585, 45.73542552],
						[21.14302604, 45.74244361],
						[21.16313724, 45.74730177],
						[21.17396635, 45.74730177],
						[21.18479545, 45.75701683],
						[21.17667362, 45.76538122],
						[21.17087232, 45.76915827],
						[21.18827624, 45.77374435],
						[21.20800068, 45.76942805],
						[21.20877419, 45.78210623],
						[21.1994921, 45.79801732],
						[21.18982325, 45.81203688],
						[21.18711598, 45.83898766],
						[21.1944643, 45.82012348],
						[21.20490665, 45.80287064],
						[21.21805628, 45.78507305],
						[21.23662047, 45.79801732],
						[21.23932775, 45.79316357],
						[21.23662047, 45.78857909]
					];

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
