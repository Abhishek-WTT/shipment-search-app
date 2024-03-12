import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private fb: FormBuilder, private translate: TranslateService, private router: Router, private http: HttpClient) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.initForm();

    this.translate
      .get('home.LABEL_WhatDoYouWantToDO')
      .subscribe((text: string) => {
        // Assign the translated string to the questionLabel property
        this.questionLabel = text;
      });

      this.http.get<any>('assets/shipment-list.json').subscribe((data) => {
        this.shipments = data.Shipments.Shipment;
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
    console.log('Form submitted with data:', this.searchForm.value);
    // Add your search logic here
    const formData = this.searchForm.value;
    
    // Simulate search logic using mock data
    const results = this.searchShipments(formData);

    if (results.length === 1) {
      // If only one result, navigate to shipment summary
      this.router.navigate(['/shipments/details/:id', results[0].shipmentId]);
    } else {
      // If multiple results, navigate to search results screen
      this.router.navigate(['/shipments/results'], { state: { results: results } });
    }
  }

  private searchShipments(formData: any): any[] {
    // Implement your search logic here
    // For now, let's just return the entire mock data as search results
    return this.shipments;
  }

  onReset(): void {
    this.searchForm.reset();
  }
}



