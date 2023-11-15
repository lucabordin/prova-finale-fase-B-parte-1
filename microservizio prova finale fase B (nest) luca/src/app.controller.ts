import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { NuovoOrdineDa0Event } from './Eventi/eventoOrdinareSe0.event';
import { NuovoOrdineDaMeno0Event } from './Eventi/eventoOrdinareseMeno0.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('nuovo_ordine1')
  gestistiOrdine1(data: NuovoOrdineDa0Event) {
    this.appService.gestisciNuovoOrdineDa0Event(data.ordinareDa0);
  }

  @EventPattern('nuovo_ordine2')
  gestistiOrdine2(data: NuovoOrdineDaMeno0Event) {
    this.appService.gestisciNuovoOrdineDaMeno0Event(data.ordinareDaMeno0);
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
