import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RenderService {
	private isBoolean: boolean = false;
	private showAddEventForm: boolean = false;
	private showAddEvent: boolean = false;

	constructor() {}

	setBoolean(value: boolean) {
		this.isBoolean = value;
	}

	getBoolean(): boolean {
		return this.isBoolean;
	}

	getBooleanShowAddEventForm(): boolean {
		return this.showAddEventForm;
	}

	setBooleanShowAddEventForm(value: boolean) {
		this.showAddEventForm = value;
	}

	getBooleanShowAddEvent() {
		return this.showAddEvent;
	}

	setBooleanShowAddEvent(value: boolean) {
		this.showAddEvent = value;
	}
}
