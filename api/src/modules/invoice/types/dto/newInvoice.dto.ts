import { IsArray, IsString } from 'class-validator';

export class NewInvoiceDTO {
  @IsString()
  companyName: string;

  @IsString()
  taxpayerNumber: string;

  @IsArray()
  ridesId: string[];
}
