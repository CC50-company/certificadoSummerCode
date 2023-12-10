import { ApiProperty } from '@nestjs/swagger';
import { Person } from './Person';
import { PersonStatus } from './status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class Student {
  @ApiProperty()
  @IsEnum(PersonStatus)
  @IsOptional()
  status: PersonStatus = PersonStatus.FORBIDDEN;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  certificateId?: string;
  
  @ApiProperty()
  @IsOptional()
  person?: Person;

  constructor(student: {status?: PersonStatus, certificateId?: string, person?: Person}) {
    this.status = student?.status? student?.status : PersonStatus.FORBIDDEN;
    this.certificateId = student?.certificateId;
    this.person = student?.person;
  }

  updateStudent(updatedStudent:  {
    status?: PersonStatus, person?: Person, certificateId?: string
  }): Student {
    this.certificateId = updatedStudent?.certificateId ? updatedStudent?.certificateId : this.certificateId;
    this.status = updatedStudent?.status ? updatedStudent?.status : this.status;
    this.person = {
        email: updatedStudent?.person?.email ? updatedStudent?.person.email : this.person.email,
        dataEmissao: updatedStudent?.person?.dataEmissao ? updatedStudent?.person.dataEmissao : this.person.dataEmissao,
        name: updatedStudent?.person?.name ? updatedStudent?.person.name : this.person.name,
    };
    return this
  }
}
