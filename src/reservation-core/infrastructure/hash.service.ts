import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return Promise.resolve(bcrypt.hash(password, salt));
  }

  compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
