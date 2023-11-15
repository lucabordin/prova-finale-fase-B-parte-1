import { HttpException, Injectable } from '@nestjs/common';
import { NuovoOrdineDa0Event } from './Eventi/eventoOrdinareSe0.event';
import { NuovoOrdineDaMeno0Event } from './Eventi/eventoOrdinareseMeno0.event';
import { HttpService } from '@nestjs/axios';
import { ProdottiDto } from './dto/prodotto.dto';
import { catchError, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async gestisciNuovoOrdineDa0Event(data: ProdottiDto) {
    await this.httpService
      .patch(
        `http://localhost:3000/prodotti/ordinare/${data.idProdotto}`,
        data.QuantitaMinimaOrdine,
      )
      .pipe(
        map((resp) => resp.data),
        catchError((err) => {
          throw new HttpException(err.response.data, err.response.status);
        }),
      );
    // console.log('prodotto creato - COMMUNICATION', data);
    // codice da eseguire ad ogni nuovo evento
  }
  async gestisciNuovoOrdineDaMeno0Event(data: ProdottiDto) {
    const id: number = data.idProdotto;
    await this.httpService
      .patch(
        `http://localhost:3000/prodotti/ordinare/${data.idProdotto}`,
        data.Giacenza + data.QuantitaMinimaOrdine,
      )
      .pipe(
        map((resp) => resp.data),
        catchError((err) => {
          throw new HttpException(err.response.data, err.response.status);
        }),
      );
    // console.log('prodotto creato - COMMUNICATION', data);
    // codice da eseguire ad ogni nuovo evento
  }
  getHello(): string {
    return 'Hello World!';
  }
}
