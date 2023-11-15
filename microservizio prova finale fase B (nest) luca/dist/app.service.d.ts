import { HttpService } from '@nestjs/axios';
import { ProdottiDto } from './dto/prodotto.dto';
export declare class AppService {
    private readonly httpService;
    constructor(httpService: HttpService);
    gestisciNuovoOrdineDa0Event(data: ProdottiDto): Promise<void>;
    gestisciNuovoOrdineDaMeno0Event(data: ProdottiDto): Promise<void>;
    getHello(): string;
}
