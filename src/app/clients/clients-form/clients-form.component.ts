import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientsService } from 'src/app/clients.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {

  client!: Client
  success!: boolean
  updateSuccess!: boolean
  errors: String[] | undefined
  id!: number

  constructor( private clientService: ClientsService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { 
    this.client = clientService.getClient();
  }

  ngOnInit(): void {
    let params = this.activatedRoute.params
    params.subscribe(param => {
      let id = param['id'];
      if (id) {
        this.id = Number(id);
        this.clientService.getClientById(this.id)
         .subscribe(client => {
          this.client= client;
        })
      }
    })
  }

  onSubmit() {
    if (this.id) {
      this.clientService.update(this.client)
          .subscribe(response => {
            this.success = true
          }, errorResponse => {
            this.errors = ['Erro ao atualizar o cliente']
          });
    } else {
      this.clientService.save(this.client)
      .subscribe(response => {
        this.success = true
        this.errors = undefined
        this.client = response;
        this.router.navigate(['/clients/list'])
      }, errorResponse => {
        this.errors = errorResponse.error.errors;
        this.success = false;
      });
    }
  }
}
