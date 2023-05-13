import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-drawer-eveniment',
	templateUrl: './drawer-eveniment.component.html',
	styleUrls: ['./drawer-eveniment.component.scss']
})
export class DrawerEvenimentComponent {
	@Input() name = '';
	@Input() type = '';
	@Input() description = '';
	@Input() link = '';
	@Input() date = '';

	isOpen = false;

	toggleDrawer() {
		this.isOpen = !this.isOpen;
	}
}
