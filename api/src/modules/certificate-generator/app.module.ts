import { Module } from '@nestjs/common';
import { CertificateGeneratorController } from './app.controller';
import { CertificateGeneratorService } from './app.service';
import { CertificateGeneratorRepository } from './app.repository';

@Module({
  imports: [],
  controllers: [CertificateGeneratorController],
  providers: [CertificateGeneratorService, CertificateGeneratorRepository],
})
export class CertificateGeneratorModule {}
