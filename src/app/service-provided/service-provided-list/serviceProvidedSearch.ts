import { Client } from "src/app/clients/client"

export class ServiceProvidedSearch {

    client: Client
    description: string
    value: number
    providedTime: string

    constructor(client: Client, description: string, value: number, providedTime: string) {
        this.client = client
        this.description = description
        this.value = value
        this.providedTime = providedTime
    }
}