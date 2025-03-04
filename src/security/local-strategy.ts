import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../reservation-core/modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string, headquarterId: number) {
    const user = await this.authService.validateUser(email, password, headquarterId);
    if (!user) {
      throw new UnauthorizedException('Credencial invalida o institucion invalida');
    }

    return user;
  }
}
