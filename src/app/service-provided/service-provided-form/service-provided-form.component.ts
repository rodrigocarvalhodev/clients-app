import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/clients.service';
import { Client } from 'src/app/clients/client';
import { ProvidedService } from 'src/app/provided.service';
import { ServiceProvided } from '../service-provided';

@Component({
  selector: 'app-service-provided-form',
  templateUrl: './service-provided-form.component.html',
  styleUrls: ['./service-provided-form.component.css']
})
export class ServiceProvidedFormComponent implements OnInit {

  clients: Client[] = []
  selectedClient: Client | undefined
  service: ServiceProvided
  success!: boolean
  errors: String[] | undefined


  constructor(
    private clientService: ClientsService,
    private providedService: ProvidedService
  ) { 
    this.service = new ServiceProvided()
  }

  ngOnInit(): void {
    this.clientService.getClients()
                .subscribe(response => this.clients = response)
  }

  onSubmit() {
    if (this.service.id) {
      this.clientService.getClientById(this.service.id)
      .subscribe(response => {
        this.selectedClient = response
        this.providedService.save(this.service)
                .subscribe(response => {
                  this.success = true
                  this.errors = undefined
                  this.service = new ServiceProvided()
                }, errorResponse => {
                  this.success = false
                  this.errors = errorResponse.error.errors
                })
      });
    }
  }
}
