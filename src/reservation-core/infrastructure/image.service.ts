import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs-extra';

@Injectable()
export class ImageService {
  private readonly uploadPath = join(__dirname, '..', '..', 'uploads');

  constructor() {
    // Asegurar que la carpeta de uploads existe (opcional hacerlo asíncrono)
    fs.ensureDirSync(this.uploadPath);
  }

  async saveImage(file: {
    originalname: string;
    buffer: Buffer;
  }): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = join(this.uploadPath, fileName);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await fs.writeFile(filePath, file.buffer);

    return fileName;
  }

  async getImage(filename: string): Promise<Buffer> {
    const filePath = join(this.uploadPath, filename);
    if (!fs.pathExistsSync(filePath)) {
      throw new NotFoundException('Image not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return fs.readFile(filePath);
  }
}
