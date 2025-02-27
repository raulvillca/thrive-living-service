export interface UpdateHeadquarterDto {
  id: number;
  location: string;
  active: boolean;
  companyId: number;
  supervisorId: number;
}

export type CreateHeadquarterDto = Omit<UpdateHeadquarterDto, 'id'>;
