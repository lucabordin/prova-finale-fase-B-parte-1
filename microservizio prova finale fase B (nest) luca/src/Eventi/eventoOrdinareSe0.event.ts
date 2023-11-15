import { ProdottiDto } from 'src/dto/prodotto.dto';

export class NuovoOrdineDa0Event {
  constructor(public readonly ordinareDa0: ProdottiDto) {}
  //   constructor(public readonly prodotto: CreateProdottiDto) {}
}
