import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `category's name` })
  readonly name: string;
}

export class UpdateCategoriesDto extends PartialType(CreateCategoriesDto) {}
