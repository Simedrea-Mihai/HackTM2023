import { Component } from '@angular/core';
declare var navigator: Navigator;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'FE';

	name = 'Nume eveniment';
	type = 'Eveniment oficial';
	description =
		'Scurta descriere a evenimentului in caz ca e mai lunga de 3 randuri care incap in casuta asta o sa fie completate cu Scurta descriere a evenimentului in caz ca e mai lunga de 3 randuri care incap in casuta asta o sa fie completate cu Scurta descriere a evenimentului in caz ca e mai lunga de 3 randuri care incap in casuta asta o sa fie completate cu Scurta descriere a evenimentului in caz ca e mai lunga de 3 randuri care incap in casuta asta o sa fie completate cu Scurta descriere a evenimentului in caz ca e mai lunga de 3 randuri care incap in casuta asta o sa fie completate cu  descriere a evenimentului in caz ca e mai lunga de 3 randuri care incap in ';
	link = 'https:  //angular.io/guide/component-interaction';
	date = '22 - 01 - 2023';
}
