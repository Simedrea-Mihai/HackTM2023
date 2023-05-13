import { Component, OnInit, inject } from '@angular/core';
import { ShowLegendService } from './services/legen.service';
declare var navigator: Navigator;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	showLegend = false;
	legendService = inject(ShowLegendService);

	ngOnInit(): void {
		this.legendService.getEvent().subscribe((response) => {
			this.showLegend = response;
		});
	}

	title = 'FE';

	name = 'Nume eveniment';
	type = 'Eveniment oficial';
	description =
		'Scurta descriere a evenimentului in caz ca e mai lunga de 3 randuri care incap in casuta asta o sa fie completate cu Scurta descriere a evenimentului in caz ca e mai lunga de 3 randuri care incap in casuta asta o sa fie completate cu Scurta descriere a evenimentului in caz ca e mai lunga de 3 randuri care incap in casuta asta o sa fie completate cu Scurta descriere a evenimentului in caz ca e mai lunga de 3 randuri care incap in casuta asta o sa fie completate cu Scurta descriere a evenimentului in caz ca e mai lunga de 3 randuri care incap in casuta asta o sa fie completate cu  descriere a evenimentului in caz ca e mai lunga de 3 randuri care incap in ';
	link = 'https:  //angular.io/guide/component-interaction';
	date = '22 - 01 - 2023';

	location = 'Bulevardul Vasile Pârvan 4, Timișoara 300223';
}
