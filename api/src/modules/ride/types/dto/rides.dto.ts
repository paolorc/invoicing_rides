import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginatedDTO } from 'lib/pagination';

export class RidesDTO extends PaginatedDTO {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  passengerId: number;
}
