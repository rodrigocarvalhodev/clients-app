import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './clients/client';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  apiUrl: string = environment.apiURL + '/api/clients';

  constructor(
    private httpClient: HttpClient) {
  }

  save(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.apiUrl, client)
  }

  update(client: Client): Observable<any> {
    return this.httpClient.put<Client>(`${this.apiUrl}/${client.id}`, client)
  }

  delete(client: Client): Observable<any> {
    return this.httpClient.delete<Client>(`${this.apiUrl}/${client.id}`)
  }

  getClient(): Client {
    let client: Client = new Client()
    return client
  }

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.apiUrl}`)
  }

  getClientById(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.apiUrl}/${id}`)
  }

  getTokenHeader() {
    const tokenString = localStorage.getItem('access_token')
    let token
    if (tokenString) {
      token = JSON.parse(tokenString).access_token
    }
    const headers = {
      'Authorization': 'Bearer ' + token
    }
    return headers
  }
}