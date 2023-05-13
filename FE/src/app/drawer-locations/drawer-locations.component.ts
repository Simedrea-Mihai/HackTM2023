import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-drawer-locations',
	templateUrl: './drawer-locations.component.html',
	styleUrls: ['./drawer-locations.component.scss']
})
export class DrawerLocationsComponent {
	@Input() location = '';
}
