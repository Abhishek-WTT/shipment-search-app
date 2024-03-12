import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
    constructor(private http: HttpClient) {}

    getShipmentList(): Observable<any> {
        // Replace with your actual API call
        return this.http.get<any>(`assets/shipment-list.json`);
    }

    getShipmentDetails(shipmentId: string): Observable<any> {
        // Replace with your actual API call
        return this.http.get<any>(`assets/shipment-details.json`);
    }
}
