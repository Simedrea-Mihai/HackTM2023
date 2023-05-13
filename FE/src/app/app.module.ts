import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './shared/components/map/map.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FilterButtonComponent } from './filter-button/filter-button.component';
import { LegendComponent } from './legend/legend.component';
import { MatIconModule } from '@angular/material/icon';
import { DrawerEvenimentComponent } from './drawer-eveniment/drawer-eveniment.component';
@NgModule({
	declarations: [AppComponent, MapComponent, SearchBarComponent, FilterButtonComponent, LegendComponent, DrawerEvenimentComponent],
	imports: [BrowserModule, MatIconModule, AppRoutingModule, BrowserAnimationsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
