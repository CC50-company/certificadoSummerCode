import { Person } from './Person';
import { Status } from './status.enum';

export class Student {
  status: Status = Status.FORBIDDEN;
  certificateId?: string;
  person?: Person;

  constructor(student: {status?: Status, certificateId?: string, person?: Person}) {
    this.status = student?.status? student?.status : Status.FORBIDDEN;
    this.certificateId = student?.certificateId;
    this.person = student?.person;
  }
}
