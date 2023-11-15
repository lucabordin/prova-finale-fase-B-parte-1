import { AppService } from './app.service';
import { NuovoOrdineDa0Event } from './Eventi/eventoOrdinareSe0.event';
import { NuovoOrdineDaMeno0Event } from './Eventi/eventoOrdinareseMeno0.event';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    gestistiOrdine1(data: NuovoOrdineDa0Event): void;
    gestistiOrdine2(data: NuovoOrdineDaMeno0Event): void;
    getHello(): string;
}
