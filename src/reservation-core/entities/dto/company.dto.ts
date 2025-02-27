export interface UpdateCompanyDto {
  id: number;
  initialDate?: Date;
  phone: string;
  description: string;
  email: string;
  imageUrl?: string;
  logoUrl?: string;
}

export type CreateCompanyDto = Omit<UpdateCompanyDto, 'id'>;
