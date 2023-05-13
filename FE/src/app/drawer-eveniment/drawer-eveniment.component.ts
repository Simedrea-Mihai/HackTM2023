import { Component, Input, OnInit } from '@angular/core';
import { RenderService } from '../services/render.service';

@Component({
	selector: 'app-drawer-eveniment',
	templateUrl: './drawer-eveniment.component.html',
	styleUrls: ['./drawer-eveniment.component.scss']
})
export class DrawerEvenimentComponent implements OnInit {
	@Input() name = '';
	@Input() type = '';
	@Input() description = '';
	@Input() link = '';
	@Input() date = '';

	isOpen = false;
	isComponentInView = false;

	constructor(private readonly renderService: RenderService) {

	}

	ngOnInit(): void {
	}

	ngDoCheck(): void {
		console.log(this.renderService.getBoolean());
		this.isComponentInView = this.renderService.getBoolean();
	}

	test(): void {
		console.log('btn pressed');
	}

	close(): void {
		this.isComponentInView = false;
		this.renderService.setBoolean(this.isComponentInView);
	}

	toggleDrawer() {
		console.log(this.renderService.getBoolean());
		this.isOpen = !this.isOpen;
	}
}
