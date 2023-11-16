import { Controller, Get, ForbiddenException, Post, Param, Body } from '@nestjs/common';
import { CertificateGeneratorService } from './app.service';
import { Status } from './entities/status.enum';
import { Person } from './entities/Person';

@Controller('certificate')
export class CertificateGeneratorController {
  getCertificateStrategies: object
  constructor(private readonly appService: CertificateGeneratorService) {
    this.getCertificateStrategies = {
      [Status.FORBIDDEN]: async (pearson: Person) => { throw ForbiddenException },
      [Status.ALLOWED]: appService.generateCertificate,
      [Status.GENERATED]: appService.getCertificate,
    };
  }
  @Get('status')
  checkAllowed(@Param() email: string): Status {
    return this.appService.checkStatus(email);
  }
  @Post()
  async generateCertificate(@Body() person: Person): Promise<Uint8Array> {
    const status = this.appService.checkStatus(person.email);
    const getCertificateStrategy = this.getCertificateStrategies[status];
    return await getCertificateStrategy(person);
  }
  @Get()
  async getCertiticate(@Param() email: string): Promise<Uint8Array> {
    const status = this.appService.checkStatus(email);
    if (status != Status.GENERATED) {
      throw ForbiddenException;
    };
    const person = this.appService.getPerson(email);
    return await this.appService.getCertificate(person);
  }

}
