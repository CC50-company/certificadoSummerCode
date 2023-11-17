import { Injectable } from '@nestjs/common';
import { CertificateGeneratorRepository } from './app.repository';
import { generateCertificate } from './services/GenerateCertificate';
import { Status } from './entities/status.enum';
import { Person } from './entities/Person';

@Injectable()
export class CertificateGeneratorService {
  constructor(private readonly appRepository: CertificateGeneratorRepository) {};

  checkStatus(email: string): Status {
    const student = this.appRepository.getStudent(email);
    return student?.status ? student.status : Status.FORBIDDEN;
  }
  changeStatus(email: string, status: Status): boolean {
    const student = this.appRepository.getStudent(email);
    student.status = status;
    return this.appRepository.upsertStudent(student);
  }
  getPerson(email: string): Person {
    return this.appRepository.getStudent(email).person;
  }
  async generateCertificate(person: Person): Promise<Uint8Array> {
    const certificate = this.getCertificate(person);
    this.changeStatus(person.email, Status.GENERATED);
    return certificate;
  }
  async getCertificate(person: Person): Promise<Uint8Array> {
    return generateCertificate(person);
  }
}
