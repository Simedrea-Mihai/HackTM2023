import { Component, Input, OnInit, inject } from '@angular/core';
import { RenderService } from '../services/render.service';
import { Point } from '../drawer-locations/drawer-locations.component';
import { TrackService } from '../services/track.service';
import { SpeakService } from '../services/speak.service';

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

	constructor(private readonly renderService: RenderService, private readonly service: SpeakService) {}

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

	start(): void {
		this.service.content = this.description;
		this.service.start();
		this.service.resume();
	}
}
