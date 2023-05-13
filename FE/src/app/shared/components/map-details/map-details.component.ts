import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map-details',
  templateUrl: './map-details.component.html',
  styleUrls: ['./map-details.component.scss']
})
export class MapDetailsComponent {
  @Input() message = 'Default Pop-up Message.';

  constructor() { }

  ngOnInit() {
  }
}
