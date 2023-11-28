import { StreamableFile, Controller, Get, ForbiddenException, Post, Query, Param, Body, NotFoundException } from '@nestjs/common';
import { CertificateGeneratorService } from './app.service';
import { Status } from './entities/status.enum';
import { Person } from './entities/Person';
import { Student } from './entities/Student';

@Controller('certificate')
export class CertificateGeneratorController {
  getCertificateStrategies: object
  constructor(private readonly appService: CertificateGeneratorService) {
    this.getCertificateStrategies = {
      [Status.FORBIDDEN]: async (student: Student) => { throw new ForbiddenException },
      [Status.ALLOWED]: appService.generateCertificate.bind(appService),
      [Status.GENERATED]: async (student: Student) => student.certificateId,
    };
  }
  @Get('status')
  checkAllowed(@Query('email') email: string): Status {
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
    if (student.status != Status.GENERATED) {
      throw new ForbiddenException();
    };
    const certificate = await this.appService.mountCertificate(student);
    return new StreamableFile(certificate, {type: ".pdf"});
  }
  @Get(':id.pdf')
  async getCertiticateById(@Param('id') id: string): Promise<StreamableFile> {
    const email = this.appService.getEmailByCertificateId(id);
    if (!email) {
      throw new NotFoundException();
    };
    return await this.getCertiticateByEmail(email);
  }

}
