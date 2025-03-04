import { CompanyDto } from './company.dto';
import { UserDto } from './user.dto';

export interface CompanyDemoDto {
  company: CompanyDto;
  location: string;
  user: UserDto;
}
