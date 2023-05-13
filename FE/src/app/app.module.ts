import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './shared/components/map/map.component';
import { FilterButtonComponent } from './filter-button/filter-button.component';
import { LegendComponent } from './legend/legend.component';
import { MatIconModule } from '@angular/material/icon';
import { DrawerEvenimentComponent } from './drawer-eveniment/drawer-eveniment.component';
import { DrawerFilterComponent } from './drawer-filter/drawer-filter.component';
import { DrawerLocationsComponent } from './drawer-locations/drawer-locations.component';
import { DrawerAddEventComponent } from './drawer-add-event/drawer-add-event.component';
import { HttpClientModule } from '@angular/common/http';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		FilterButtonComponent,
		LegendComponent,
		DrawerEvenimentComponent,
		DrawerFilterComponent,
		DrawerLocationsComponent,
		DrawerAddEventComponent,
  BottomNavComponent
	],
	imports: [
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		BrowserModule,
		MatIconModule,
		AppRoutingModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
