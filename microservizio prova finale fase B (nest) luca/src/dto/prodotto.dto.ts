import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ProdottiDto {
  @IsNumber()
  @IsNotEmpty()
  idProdotto: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  Giacenza: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  QuantitaMinimaOrdine: number;
}
