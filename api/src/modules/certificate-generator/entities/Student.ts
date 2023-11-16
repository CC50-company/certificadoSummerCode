import { Person } from './Person';
import { Status } from './status.enum';

export interface Student {
  person: Person;
  status: Status;
}
