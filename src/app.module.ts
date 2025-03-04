import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationCoreModule } from './reservation-core/reservation-core.module';
import { InfrastructureModule } from './reservation-core/infrastructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InfrastructureModule,
    SecurityModule,
    ReservationCoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
