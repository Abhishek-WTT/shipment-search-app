// home/home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Needed for routing
import { ShipmentSearchComponent } from './shipment-search/shipment-search.component';
import { HomeRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ShipmentSearchComponent], // Add ShipmentSearchComponent
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  // exports: [ShipmentSearchComponent], // Only if needed for other modules
  // bootstrap: [ShipmentSearchComponent] // Set HomeComponent as the bootstrap component (if applicable)
})
export class HomeModule { }
