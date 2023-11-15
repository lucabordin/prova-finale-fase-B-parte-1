import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UseGuards,
  UseFilters,
  HttpException,
} from '@nestjs/common';
import { ClientiService } from './clienti.service';
import { CreateClientiDto } from './dto/create-clienti.dto';
import { UpdateClientiDto } from './dto/update-clienti.dto';
import { LoginClientiDto } from './dto/login-clienti.dto';
import { Public } from 'src/decoratorsCustom/public.decorator';
import { AuthGuard } from 'src/guards/authToken.guards';
import { HttpExceptionFilter } from 'src/ExceptionFilter/customHTTPExceptionFilter';
import { LoggerService } from 'src/logger/logger.service';
import { LogDto } from 'src/logger/dto/log.dto';
import { catchError, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Controller('clienti')
export class ClientiController {
  constructor(
    private readonly clientiService: ClientiService,
    private readonly logservice: LoggerService,
  ) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(
    @Body() createClientiDto: CreateClientiDto,
  ): Promise<string | never> {
    try {
      if (await this.clientiService.create(createClientiDto))
        return 'inserimento effettuato con successo';
      else
        throw new BadRequestException(
          "errore durante l'ealborazione della richiesta",
        );
    } catch (error) {
      this.logservice.logging(error);
      throw new NotFoundException(error);
    }
  }

  @Post('/login')
  @UseFilters(new HttpExceptionFilter())
  async login(@Body() loginClientiDto: LoginClientiDto) {
    try {
      console.log(loginClientiDto);
      const token = await this.clientiService.login(loginClientiDto);
      console.log(token);
      return token;
    } catch (error) {
      this.logservice.logging(error);
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  async findOne(@Param('id') id: string) {
    try {
      return await this.clientiService.findOne(id);
    } catch (error) {
      this.logservice.logging(error);
      throw new NotFoundException(error);
    }
  }
  // async logging(log) {
  //   const logCompleto: LogDto = {
  //     Messaggio: log.message,
  //     Timestamp: new Date(),
  //     EndpointUrl: `http://localhots:3000/${log.url}`,
  //   };
  //   await this.httpService.post(`http://localhost:5000/api/Log`, log).pipe(
  //     map((resp) => resp.data),
  //     catchError((err) => {
  //       throw new HttpException(err.response.data, err.response.status);
  //     }),
  //   );
  // }
}
