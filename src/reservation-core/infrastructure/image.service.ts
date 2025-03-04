import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class ImageService {
  private readonly bucketName: string;

  constructor(
    @Inject('MINIO_CLIENT') private readonly minioClient: S3Client,
    private readonly configService: ConfigService,
  ) {
    this.bucketName = this.configService.get<string>('MINIO_BUCKET', 'uploads');
  }

  async saveImage(file: { originalname: string; buffer: Buffer }): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileName = `${Date.now()}-${file.originalname}`;

    await this.minioClient.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: 'image/jpeg',
      }),
    );

    return fileName;
  }

  async getImageUrl(filename: string): Promise<string> {
    try {
      return await getSignedUrl(
        this.minioClient,
        new GetObjectCommand({
          Bucket: this.bucketName,
          Key: filename,
        }),
        { expiresIn: 3600 },
      );
    } catch (error) {
      throw new NotFoundException('Image not found');
    }
  }

  async deleteImage(filename: string): Promise<void> {
    await this.minioClient.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: filename,
      }),
    );
  }
}
