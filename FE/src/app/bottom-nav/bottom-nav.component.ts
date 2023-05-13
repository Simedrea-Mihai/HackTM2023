import { Component } from '@angular/core';

@Component({
	selector: 'app-bottom-nav',
	templateUrl: './bottom-nav.component.html',
	styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {
	btnNumber: number = 2;
	setBtn(n: number) {
		console.log(n);
		this.btnNumber = n;
	}
}
