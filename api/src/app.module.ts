import { Module } from '@nestjs/common';
import { CertificateGeneratorModule } from './modules/certificate-generator/app.module';
import { HealthController } from './modules/health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CertificateGeneratorModule, TerminusModule, HttpModule],
  controllers: [HealthController],
})
export class AppModule {}
