import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProdottiDto } from './dto/create-prodotti.dto';
import { UpdateProdottiDto } from './dto/update-prodotti.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdottoEntity } from './entities/prodotti.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { NuovoOrdineDa0Event } from './Eventi/eventoOrdinareSe0.event';
import { NuovoOrdineDaMeno0Event } from './Eventi/eventoOrdinareseMeno0.event';

@Injectable()
export class ProdottiService {
  constructor(
    @InjectRepository(ProdottoEntity)
    private prodottiRepository: Repository<ProdottoEntity>,
    @Inject('EVENT_COMMUNICATION')
    private readonly communicationClient: ClientProxy,
  ) {}

  async create(createProdottiDto: CreateProdottiDto) {
    try {
      const nuovoProdotto: CreateProdottiDto =
        await this.prodottiRepository.create(createProdottiDto);
      await this.prodottiRepository.save(nuovoProdotto);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async ordinare(
    id: number,
    quantita: UpdateProdottiDto,
  ): Promise<boolean | never> {
    try {
      const prodotto: CreateProdottiDto =
        await this.prodottiRepository.findOneBy({
          idProdotto: id,
        });
      if (!prodotto)
        throw new Error(`nessun prodotto corrispondente all'id ${id} trovato`);
      prodotto.Giacenza += quantita.Giacenza;
      await this.prodottiRepository.update(id, prodotto);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async vendere(id: number, quantita: UpdateProdottiDto) {
    try {
      const prodotto: CreateProdottiDto =
        await this.prodottiRepository.findOneBy({
          idProdotto: id,
        });
      if (!prodotto) {
        // return false;
        throw new Error(`nessun prodotto corrispondente all'id ${id} trovato`);
      }
      if (prodotto.Giacenza - quantita.Giacenza == 0) {
        quantita.idProdotto = id;
        quantita.QuantitaMinimaOrdine = prodotto.QuantitaMinimaOrdine;
        this.communicationClient.emit(
          'nuovo_ordine1',
          new NuovoOrdineDa0Event(quantita),
        );
      }
      if (prodotto.Giacenza - quantita.Giacenza < 0) {
        quantita.idProdotto = id;
        quantita.QuantitaMinimaOrdine = prodotto.QuantitaMinimaOrdine;
        quantita.Giacenza -= prodotto.Giacenza;
        this.communicationClient.emit(
          'nuovo_ordine2',
          new NuovoOrdineDaMeno0Event(quantita),
        );
      }
      if (quantita.Giacenza > prodotto.Giacenza) {
        // console.log(quantita.Giacenza);
        throw new BadRequestException(
          'impossibile effettuare la richesta poichè si supera la giacenza in magazzino',
        );
      }
      prodotto.Giacenza -= quantita.Giacenza;
      await this.prodottiRepository.update(id, prodotto);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
