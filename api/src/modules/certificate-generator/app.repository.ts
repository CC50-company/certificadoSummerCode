import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Student } from './entities/Student';

@Injectable()
export class CertificateGeneratorRepository {
  private readonly filePathStudents = 'estudantes.json';
  private readonly filePathCertificates = 'ids.json';
  
  constructor() {
    fs.exists(this.filePathStudents, (exists) => {
      if (!exists){
        fs.writeFile(this.filePathStudents, '{}', () => {})
      }
    })
    fs.exists(this.filePathCertificates, (exists) => {
      if (!exists){
        fs.writeFile(this.filePathCertificates, '{}', () => {})
      }
    })
  }
  private getJson(path: string): any {
    const rawData = fs.readFileSync(path, 'utf8');
    const jsonData = JSON.parse(rawData);
    return jsonData;
  }
  private setJson(path: string, json: any): boolean {
    var writeSuccessful = false;
    fs.writeFile(path, JSON.stringify(json), () => { writeSuccessful = true })
    return writeSuccessful;
  }

  private getStudents(): {email: Student} {
    return this.getJson(this.filePathStudents);
  }
  private setStudents(students: {email: Student}): boolean  {
    return this.setJson(this.filePathStudents, students)
  }
  private getCertificates(): {ids: string} {
    return this.getJson(this.filePathCertificates);
  }
  private setCertificates(certificates: {ids: string}): boolean  {
    return this.setJson(this.filePathCertificates, certificates)
  }
  
  findEmailById(id: string): string {
    let ids = this.getCertificates();
    return ids[id];
  }
  setEmailId(email: string, id: string): boolean {
    let certificates = this.getCertificates();
    certificates[id] = email
    return this.setCertificates(certificates);
  }
  getStudent(email: string): Student {
    let students = this.getStudents();
    return new Student(students[email]);
  }
  upsertStudent(student: Student): boolean {
    let students = this.getStudents();
    students[student.person.email] = student
    return this.setStudents(students);
  }
  deleteCertificate(id: string): boolean {
    let certificates = this.getCertificates();
    delete certificates[id];
    return this.setCertificates(certificates);
  }
}
