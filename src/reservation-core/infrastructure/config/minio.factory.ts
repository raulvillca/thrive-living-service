import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { FactoryProvider } from '@nestjs/common';

export const MinioFactory: FactoryProvider<S3Client> = {
  provide: 'MINIO_CLIENT',
  useFactory: (configService: ConfigService) => {
    return new S3Client({
      region: configService.getOrThrow('MINIO_REGION'),
      endpoint: configService.getOrThrow('MINIO_ENDPOINT'),
      credentials: {
        accessKeyId: configService.getOrThrow('MINIO_ACCESS_KEY'),
        secretAccessKey: configService.getOrThrow('MINIO_SECRET_KEY'),
      },
      forcePathStyle: true,
    });
  },
  inject: [ConfigService],
};
