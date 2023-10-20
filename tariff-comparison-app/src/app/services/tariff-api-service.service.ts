import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TariffApiServiceService {

  constructor(private httpservice: HttpClient) { }

  rootURL = '/api';

  getAllTariffs() {
    return this.httpservice.get(this.rootURL + '/tariffs');
  }

  getAnnualCosts(consumption: any) {
    return this.httpservice.get(this.rootURL + `/tariffs/${consumption}`);
  }

  addTariffProduct(tariff: any) {
    return this.httpservice.post(this.rootURL + '/tariffs/addproduct', {tariff});
  }

}
