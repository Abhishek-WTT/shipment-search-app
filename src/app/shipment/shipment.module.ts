import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentRoutingModule } from './shipment-routing.module';
import { ShipmentSearchResultsComponent } from './shipment-search-results/shipment-search-results.component';
import { ShipmentDetailsComponent } from './shipment-details/shipment-details.component';



@NgModule({
  declarations: [ShipmentSearchResultsComponent, ShipmentDetailsComponent],
  imports: [
    CommonModule,
    ShipmentRoutingModule
  ]
})
export class ShipmentModule { }
