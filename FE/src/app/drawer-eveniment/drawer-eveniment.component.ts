import { Component, Input, OnInit, inject } from '@angular/core';
import { RenderService } from '../services/render.service';
import { TrackService } from '../services/track.service';
import { DatePipe } from '@angular/common';

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

	trackService = inject(TrackService);

	isOpen = false;
	isComponentInView = false;

	constructor(private readonly renderService: RenderService, private datePipe: DatePipe) {}

	ngOnInit(): void {}

	ngDoCheck(): void {
		this.isComponentInView = this.renderService.getBoolean();
	}

	test(): void {
		console.log('btn pressed test');
		this.trackService.addPoint();
		console.log('btn pressed test');
		this.renderService.setBoolean(false);
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
