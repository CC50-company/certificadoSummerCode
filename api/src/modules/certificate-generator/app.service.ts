import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CertificateGeneratorRepository } from './app.repository';
import { createCertificate } from './services/GenerateCertificate';
import { PersonStatus } from './entities/status.enum';
import { Person } from './entities/Person';
import { Student } from './entities/Student';
import {v4 as uuidv4} from 'uuid';


@Injectable()
export class CertificateGeneratorService {
  constructor(private readonly appRepository: CertificateGeneratorRepository) {};

  changeStudent(email: string, student: {status?: PersonStatus, person?: Person, certificateId?: string}): boolean {
    const backupStudent = this.appRepository.getStudent(email);
    const updatedStudent = backupStudent.updateStudent(student)
    return this.appRepository.upsertStudent(updatedStudent);
  }
  getStudent(email: string): Student {
    return this.appRepository.getStudent(email);
  }
  getEmailByCertificateId(id: string): string {
    return this.appRepository.findEmailById(id);
  }

  updateStudent(newStudent: Student): boolean {
    return this.appRepository.upsertStudent(newStudent);
  }

  changeStatus(email: string, status: PersonStatus): boolean {
    const newStudent: any = { status, person: { email }};
    return this.updateStudent(newStudent);
  }

  deleteCertificate(id: string, email: string): boolean {
    return this.appRepository.deleteCertificate(id) && this.changeStatus(email, PersonStatus.ALLOWED)
  }

  async generateCertificate(student: Student): Promise<string> {
    student.certificateId = uuidv4();
    student.status = PersonStatus.GENERATED;
    try {
      await this.mountCertificate(student);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
    this.changeStudent(student.person.email, student);
    this.appRepository.setEmailId(student.person.email, student.certificateId)
    return student.certificateId;
  }
  async mountCertificate(student: Student): Promise<Uint8Array> {
    return createCertificate(student);
  }
}
