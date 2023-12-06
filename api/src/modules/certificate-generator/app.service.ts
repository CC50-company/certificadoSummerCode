import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CertificateGeneratorRepository } from './app.repository';
import { createCertificate } from './services/GenerateCertificate';
import { PersonStatus } from './entities/status.enum';
import { Person } from './entities/Person';
import { Student } from './entities/Student';
import {v4 as uuidv4} from 'uuid';


@Injectable()
export class CertificateGeneratorService {
  constructor(@Inject("CertificateGeneratorRepository") private readonly appRepository: CertificateGeneratorRepository) {};

  private updateStudent(backupStudent: Student, updatedStudent:  {
    status?: PersonStatus, person?: Person, certificateId?: string
  }): Student {
    backupStudent.certificateId = updatedStudent?.certificateId ? updatedStudent?.certificateId : backupStudent.certificateId;
    backupStudent.status = updatedStudent?.status ? updatedStudent?.status : backupStudent.status;
    backupStudent.person = {
        email: updatedStudent?.person?.email ? updatedStudent?.person.email : backupStudent.person.email,
        dataEmissao: updatedStudent?.person?.dataEmissao ? updatedStudent?.person.dataEmissao : backupStudent.person.dataEmissao,
        name: updatedStudent?.person?.name ? updatedStudent?.person.name : backupStudent.person.name,
    };
    return backupStudent
  }
  changeStudent(email: string, student: {status?: PersonStatus, person?: Person, certificateId?: string}): boolean {
    const backupStudent = this.appRepository.getStudent(email);
    const updatedStudent = this.updateStudent(backupStudent, student)
    return this.appRepository.upsertStudent(updatedStudent);
  }
  getStudent(email: string): Student {
    return this.appRepository.getStudent(email);
  }
  getEmailByCertificateId(id: string): string {
    return this.appRepository.findEmailById(id);
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
