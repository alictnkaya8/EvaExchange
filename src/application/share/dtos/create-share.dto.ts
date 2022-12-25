import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUppercase,
  Length,
} from 'class-validator';

export class CreateShareDto {
  @IsString()
  @IsUppercase()
  @IsNotEmpty()
  @Length(3)
  symbol: string;

  @IsNumberString()
  @IsNotEmpty()
  price: string;
}
