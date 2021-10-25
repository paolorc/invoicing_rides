import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginatedDTO } from 'lib/pagination';

export class InvoicesDTO extends PaginatedDTO {}
