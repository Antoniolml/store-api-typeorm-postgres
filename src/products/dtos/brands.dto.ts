import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBrandsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `brand's name` })
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `brand's image` })
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandsDto) {}
