import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomersDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `customer's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `customer's last name` })
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `customer's phone number` })
  readonly phone: string;
}

export class UpdateCustemerDto extends PartialType(CreateCustomersDto) {}
