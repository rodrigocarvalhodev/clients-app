import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/clients.service';
import { Client } from '../client';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  clients!: Client[]
  selectedClient: Client | undefined;
  deleted!: boolean

  constructor(private clientService: ClientsService, 
              private router: Router) { 
  }

  ngOnInit(): void {
    this.clientService.
        getClients()
        .subscribe(response => {
          this.clients = response;
        });
  }

  edit(client: Client) {
    this.router.navigate([`/clients/form/${client.id}`]);
  }

  delete() {
    if (this.selectedClient) {
      this.clientService.delete(this.selectedClient)
          .subscribe(
            resonse => {
              this.deleted = true;
              this.ngOnInit()
          });
    }
  }

  prepareToDelete(client: Client) {
    this.selectedClient = client;
  }

  cancelDelection() {
    this.selectedClient = undefined;
  }
}
