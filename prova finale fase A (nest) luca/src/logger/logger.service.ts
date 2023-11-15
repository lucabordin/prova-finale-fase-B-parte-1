import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, catchError, map } from 'rxjs';
import { LogDto } from './dto/log.dto';

@Injectable()
export class LoggerService {
  constructor(private readonly httpService: HttpService) {}

  async logging(log) {
    const logCompleto: LogDto = {
      Messaggio: log.message,
      Timestamp: new Date(),
      EndpointUrl: `http://localhots:3000/${log.url}`,
    };
    const stringa = JSON.stringify(log);
    //   this.service.logging(log);
    await this.httpService.post(`http://localhost:5000/api/Log`, stringa).pipe(
      map((resp) => resp.data),
      catchError((err) => {
        console.log(err);
        throw new HttpException(err.response.data, err.response.status);
      }),
    );
  }
}
