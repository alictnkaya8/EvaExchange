import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUppercase,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateShareDto {
  @IsString()
  @IsUppercase()
  @IsNotEmpty()
  @Length(3)
  symbol: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @IsNotEmpty()
  @Max(99)
  @Min(10)
  @Type(() => Number)
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;
}
