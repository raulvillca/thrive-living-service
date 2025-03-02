import { FactoryProvider, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseFactory {
  private readonly logger = new Logger(DatabaseFactory.name);

  constructor(private readonly configService: ConfigService) {}

  createConnection() {
    try {
      const dataSource = new DataSource({
        type: 'mysql',
        host: this.configService.get<string>('DB_HOST'),
        port: this.configService.get<number>('DB_PORT'),
        username: this.configService.get<string>('DB_USER'),
        password: this.configService.get<string>('DB_PASSWORD'),
        database: this.configService.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, //Solo en desarrollo (en prod usa migraciones)
      });

      return dataSource.initialize();
    } catch (error) {
      this.logger.error('Error creating database connection:', error);
      throw error;
    }
  }

  static build(): FactoryProvider {
    return {
      provide: 'DATABASE_CONNECTION',
      useFactory: (databaseFactory: DatabaseFactory) => databaseFactory.createConnection(),
      inject: [ConfigService],
    };
  }
}
