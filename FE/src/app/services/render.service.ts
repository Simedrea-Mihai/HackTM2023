import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RenderService {
	private isBoolean: boolean = false;

	constructor() {}

	setBoolean(value: boolean) {
		this.isBoolean = value;
	}

	getBoolean(): boolean {
		return this.isBoolean;
	}
}
