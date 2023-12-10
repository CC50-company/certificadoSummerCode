import { StreamableFile, Controller, Get, Delete, Patch, Headers, ForbiddenException, Post, Query, Param, Body, NotFoundException } from '@nestjs/common';
import { CertificateGeneratorService } from './app.service';
import { PersonStatus } from './entities/status.enum';
import { Person } from './entities/Person';
import { Student } from './entities/Student';
import { ApiHeader } from '@nestjs/swagger';

@Controller('certificate')
export class CertificateGeneratorController {
  getCertificateStrategies: object
  constructor(private readonly appService: CertificateGeneratorService) {
    this.getCertificateStrategies = {
      [PersonStatus.FORBIDDEN]: async (student: Student) => { throw new ForbiddenException },
      [PersonStatus.ALLOWED]: appService.generateCertificate.bind(appService),
      [PersonStatus.GENERATED]: async (student: Student) => student.certificateId,
    };
  }
  @Get('status')
  checkAllowed(@Query('email') email: string): PersonStatus {
    const student = this.appService.getStudent(email);
    return student.status;
  }
  @Post()
  async generateCertificate(@Body() person: Person): Promise<boolean> {
    const student = this.appService.getStudent(person.email);
    const getCertificateStrategy = this.getCertificateStrategies[student.status];
    student.person = person;
    return await getCertificateStrategy(student);
  }

  @Get()
  async getCertiticateByEmail(@Query('email') email: string): Promise<StreamableFile> {
    const student = this.appService.getStudent(email);
    if (student.status != PersonStatus.GENERATED) {
      throw new ForbiddenException();
    };
    const certificate = await this.appService.mountCertificate(student);
    return new StreamableFile(certificate, {type: ".pdf"});
  }

  @Get('id')
  async getCertiticateIdByEmail(@Query('email') email: string): Promise<string> {
    const student = this.appService.getStudent(email);
    if (student.status != PersonStatus.GENERATED) {
      throw new ForbiddenException();
    };
    return student.certificateId;
  }

  @Get(':id.pdf')
  async getCertiticateById(@Param('id') id: string): Promise<StreamableFile> {
    const email = this.appService.getEmailByCertificateId(id);
    if (!email) {
      throw new NotFoundException();
    };
    return await this.getCertiticateByEmail(email);
  }


  checkPassword(password: string) {
    if (password != "stub"){
      throw new ForbiddenException();
    }
  }

  @Delete(':id')
  @ApiHeader({name: "password"})
  async deleteCertificate(@Param('id') id: string, @Headers('password') password: string): Promise<boolean> {
    this.checkPassword(password);
    const email = this.appService.getEmailByCertificateId(id);
    if (!email) {
      throw new NotFoundException();
    };
    return this.appService.deleteCertificate(id, email);
  }

  @Patch('student')
  @ApiHeader({name: "password"})
  async changeStudent(@Body() newStudent: Student, @Headers('password') password: string): Promise<boolean> {
    this.checkPassword(password);
    const student = this.appService.getStudent(newStudent.person.email);
    if (student.status != PersonStatus.GENERATED) {
      throw new ForbiddenException();
    };
    return this.appService.updateStudent(newStudent);
  }
  @Get('student')
  @ApiHeader({name: "password"})
  async getStudentByEmail(@Query('email') email: string, @Headers('password') password: string): Promise<Student> {
    this.checkPassword(password);
    return this.appService.getStudent(email);
  }

}
