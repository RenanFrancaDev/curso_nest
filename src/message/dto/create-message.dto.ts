import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(5)
  readonly text: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(5)
  readonly from: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(5)
  readonly to: string;
}
