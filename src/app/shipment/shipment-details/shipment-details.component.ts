import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shipment-details',
  templateUrl: './shipment-details.component.html',
  styleUrl: './shipment-details.component.sass'
})
export class ShipmentDetailsComponent {

  constructor ( private translate: TranslateService ) {}

}
