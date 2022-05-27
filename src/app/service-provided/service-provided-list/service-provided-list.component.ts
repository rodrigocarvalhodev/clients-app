import { Component, OnInit } from '@angular/core';
import { ProvidedService } from 'src/app/provided.service';
import { ServiceProvidedSearch } from './serviceProvidedSearch';

@Component({
  selector: 'app-service-provided-list',
  templateUrl: './service-provided-list.component.html',
  styleUrls: ['./service-provided-list.component.css']
})
export class ServiceProvidedListComponent implements OnInit {

  name: string = ""
  month: number = 1
  months: number[]
  searchList: ServiceProvidedSearch[] = []
  message: string | undefined
  error: string | undefined

  constructor(
    private service: ProvidedService
  ) { 
    this.months = [1,2,3,4,5,6,7,8,9,10,11,12]
  }

  ngOnInit(): void {
  }

  search() {
    this.service.search(this.name, this.month)
              .subscribe(response => {
                this.searchList = response;
                if (this.searchList.length == 0) {
                  this.error = "Nenhum registro encontrado."
                  this.message = undefined;
                } else {
                  this.message = `Foram encontrados ${this.searchList.length} registros`
                  this.error = undefined;
                }
              });
  }
}
