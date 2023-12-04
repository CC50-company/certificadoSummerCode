import { Person } from './Person';
import { PersonStatus } from './status.enum';

export class Student {
  status: PersonStatus = PersonStatus.FORBIDDEN;
  certificateId?: string;
  person?: Person;

  constructor(student: {status?: PersonStatus, certificateId?: string, person?: Person}) {
    this.status = student?.status? student?.status : PersonStatus.FORBIDDEN;
    this.certificateId = student?.certificateId;
    this.person = student?.person;
  }
}
