import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Student } from './entities/Student';

@Injectable()
export class CertificateGeneratorRepository {
  private readonly filePath = 'backup.json';
  
  constructor() {
    fs.exists(this.filePath, (exists) => {
      if (!exists){
        fs.writeFile(this.filePath, '{}', () => {})
      }
    })
  }

  private getStudents(): {email: Student} {
    let rawData = fs.readFileSync(this.filePath, 'utf8');
    let jsonData = JSON.parse(rawData);
    return jsonData;
  }
  private setStudents(students: {email: Student}): boolean  {
    let writeSuccessful = false;
    fs.writeFile(this.filePath, JSON.stringify(students), () => { writeSuccessful = true })
    return writeSuccessful;
  }

  getStudent(email: string): Student {
    let students = this.getStudents();
    return students[email];
  }
  upsertStudent(student: Student): boolean {
    let students = this.getStudents();
    students[student.person.email] = student
    return this.setStudents(students);
  }
}
