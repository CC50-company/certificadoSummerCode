import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class Person {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsString()
  email: string;
  
  @ApiProperty({ example: new Date() })
  @IsDateString()
  dataEmissao: string;
}
