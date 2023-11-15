import { UpdateProdottiDto } from '../dto/update-prodotti.dto';

export class NuovoOrdineDaMeno0Event {
  // constructor(public readonly ordinareDaMeno0: string) {}
  constructor(public readonly prodotto: UpdateProdottiDto) {}
}
