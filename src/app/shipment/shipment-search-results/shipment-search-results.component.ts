import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';

interface Shipment {
  AssignedToUserId: string;
  DeliveryMethod: string;
  ExpectedShipmentDate: string;
  OrderNo: string;
  ScacAndService: string;
  ShipNode: string;
  ShipmentKey: string;
  ShipmentNo: string;
  Status: string;
  BillToAddress: {
    DayPhone: string;
    EMailID: string;
    FirstName: string;
    LastName: string;
    PersonInfoKey: string;
  };
  ShipmentLines: {
    TotalNumberOfRecords: string;
  };
}

@Component({
  selector: 'app-shipment-search-results',
  templateUrl: './shipment-search-results.component.html',
  styleUrls: ['./shipment-search-results.component.sass']
})
export class ShipmentSearchResultsComponent implements AfterViewInit, OnInit {

  searchedData: Shipment[] = [];
  NoOftotalRecords: number = 0;

  constructor(private translate: TranslateService, private dataService: DataService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    if (this.searchedData.length < 1) {
      this.prepareData();
      this.cdr.detectChanges();
    }
  }

  ngAfterViewInit(): void {
   
    this.NoOftotalRecords = this.dataService.shipmentDataList?.Shipments?.TotalNumberOfRecords;
    let shipmentData: [] = this.dataService.shipmentDataList?.Shipments?.Shipment;

    if (shipmentData)
      shipmentData.forEach(element => {
        this.searchedData.push(element);
      });
  }

  prepareData() {
    this.dataService.getShipmentList().subscribe(res => {
      console.log("RES", res);
      this.dataService.shipmentDataList = res;
      this.NoOftotalRecords = this.dataService.shipmentDataList?.Shipments?.TotalNumberOfRecords;
      let shipmentData: [] = this.dataService.shipmentDataList?.Shipments?.Shipment;

    if (shipmentData)
      shipmentData.forEach(element => {
        this.searchedData.push(element);
      });
    })

  }

}
