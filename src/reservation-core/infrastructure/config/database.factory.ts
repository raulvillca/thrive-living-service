import { FactoryProvider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const DatabaseFactory: FactoryProvider<DataSource> = {
  provide: 'DATA_SOURCE',
  useFactory: (configService: ConfigService) => {
    const environment = configService.get<string>('NODE_ENV');
    const entitiesPath =
      environment === 'production'
        ? [__dirname, '../../dist/**/*.entity.js']
        : [__dirname, '../../src/**/*.entity.ts'];

    const dataSource = new DataSource({
      type: 'mysql',
      host: configService.getOrThrow<string>('DB_HOST'),
      port: configService.getOrThrow<number>('DB_PORT'),
      username: configService.getOrThrow<string>('DB_USER'),
      password: configService.getOrThrow<string>('DB_PASSWORD'),
      database: configService.getOrThrow<string>('DB_NAME'),
      entities: entitiesPath,
      //entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      //migrations: [__dirname + '/src/migration/**/*.ts'],
      synchronize: configService.getOrThrow<boolean>('DB_SYNCHRONIZE'),
      logging: true,
    });

    return dataSource.initialize();
  },
  inject: [ConfigService],
};

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'rootpassword',
        database: 'mydb',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        //migrations: [__dirname + '/src/migration/**/*.ts'],
        synchronize: true,
        logging: true,
      });

      await dataSource.initialize();
      console.log('Data Source has been initialized!');
      await dataSource.runMigrations();
      console.log('Migrations have been executed!');

      return dataSource;
    },
  },
];
