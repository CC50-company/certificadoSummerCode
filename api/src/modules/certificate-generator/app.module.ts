import { Module } from '@nestjs/common';
import { CertificateGeneratorController } from './app.controller';
import { CertificateGeneratorService } from './app.service';
import { CertificateGeneratorRepository } from './app.repository';

@Module({
  imports: [],
  controllers: [CertificateGeneratorController],
  providers: [{
      provide: 'CertificateGeneratorService',
      useClass: CertificateGeneratorService,
    }, {
      provide: 'CertificateGeneratorRepository',
      useClass: CertificateGeneratorRepository,
    }
  ],
})
export class CertificateGeneratorModule {}
