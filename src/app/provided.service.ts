import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './clients/client';
import { ServiceProvided } from './service-provided/service-provided';
import { environment } from '../environments/environment'
import { ServiceProvidedSearch } from './service-provided/service-provided-list/serviceProvidedSearch';

@Injectable({
  providedIn: 'root'
})
export class ProvidedService {

  apiUrl: string = environment.apiURL + '/api/provided-services'

  constructor(
    private httpClient: HttpClient
  ) { }

  save(serviceProvided: ServiceProvided): Observable<ServiceProvided> {
    return this.httpClient.post<ServiceProvided>(this.apiUrl, serviceProvided)
  }

  search(name: string, month: number): Observable<ServiceProvidedSearch[]>   {
    const httpParams = new HttpParams().set("name", name).set("month", month ? month.toString() : '')
    const url = `${this.apiUrl}?${httpParams.toString()}`
    console.log(url)
    return this.httpClient.get<ServiceProvidedSearch[]>(url)
  }
}