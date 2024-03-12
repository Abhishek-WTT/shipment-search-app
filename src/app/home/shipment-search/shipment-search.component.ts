import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-shipment-search',
  standalone: false,
  // imports: [],
  templateUrl: './shipment-search.component.html',
  styleUrls: ['./shipment-search.component.sass'],
})
export class ShipmentSearchComponent {
  searchForm!: FormGroup;
  questionLabel!: string;
  shipments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private router: Router,
    private http: HttpClient,
    private dataService: DataService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchAllShipments();

    this.translate
      .get('home.LABEL_WhatDoYouWantToDO')
      .subscribe((text: string) => {
        // Assign the translated string to the questionLabel property
        this.questionLabel = text;
      });
  }

  private initForm(): void {
    this.searchForm = this.fb.group({
      orderNumber: [''],
      shipmentNumber: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
    });
  }

  onSubmit(): void {
  
    console.log(this.searchForm);
    
    const formData = this.searchForm.value;
    const hasValue = Object.values(formData).some(value => value !== '');

    if (!hasValue) {
      this.router.navigate(['/shipments/results']);
      return;
    }
    
    const results = this.searchShipments(formData);

    if (results.length === 1) {
      // If only one result, navigate to shipment summary
      this.router.navigate(['/shipments/details/', results[0].ShipmentNo]);
    } else {
      // If multiple results, navigate to search results screen
      
    }
  }

  fetchAllShipments () { 
    this.dataService.getShipmentList().subscribe(res => {
      this.dataService.shipmentDataList =  res;
      this.shipments = res.Shipments.Shipment
    });
  }

  searchShipments(formData: any): any[] {
    const searchTerm = {
        orderNumber: formData?.orderNumber ? formData.orderNumber.toLowerCase() : '',
        shipmentNumber: formData?.shipmentNumber ? formData.shipmentNumber.toLowerCase() : '',
        firstName: formData?.firstName ? formData.firstName.toLowerCase() : '',
        lastName: formData?.lastName ? formData.lastName.toLowerCase() : '',
        email: formData?.email ? formData.email.toLowerCase() : '',
        phoneNumber: formData?.phoneNumber ? formData.phoneNumber.toLowerCase() : ''
    };

    return this.shipments.filter(shipment => {
        return (shipment.OrderNo.toLowerCase() === searchTerm.orderNumber ||
                shipment.ShipmentNo.toLowerCase() === searchTerm.shipmentNumber ||
                shipment.BillToAddress.FirstName.toLowerCase() === searchTerm.firstName ||
                shipment.BillToAddress.LastName.toLowerCase() === searchTerm.lastName ||
                shipment.BillToAddress.EMailID.toLowerCase() === searchTerm.email ||
                shipment.BillToAddress.DayPhone.toLowerCase() === searchTerm.phoneNumber);
    });
}


  onReset(): void {
    this.searchForm.reset();
  }
}



