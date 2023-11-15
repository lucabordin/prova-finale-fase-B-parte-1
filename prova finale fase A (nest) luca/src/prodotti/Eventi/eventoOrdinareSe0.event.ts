import { UpdateProdottiDto } from '../dto/update-prodotti.dto';

export class NuovoOrdineDa0Event {
  // constructor(public readonly ordinareDa0: string) {}
  constructor(public readonly prodotto: UpdateProdottiDto) {}
}
